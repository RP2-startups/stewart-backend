import {
  isAcceptedTypes,
  ProjectOutput,
  ProjectParticipationInput,
} from "../../models/Project/ProjectAttributes";
import { ParamsDictionary } from "express-serve-static-core";
import { Request, Response } from "express";
import Project from "../../models/Project/Project";
import ProjectParticipation from "../../models/Project/ProjectParticipation";
import { fileUtils } from "../../utils/FileUtils";
import { UserSession } from "../../models/User/UserAttributes";
import { Op } from "sequelize";
declare module 'express-session' {
    interface SessionData {
      user: UserSession;
    }
  }
interface ProjectCreateObj {
  projectParticipations: string;
  project: string;
}
interface ProjectAcceptReject {
  project_id: number;
}
interface ProjectSearchReq{
  search_term: string;
}

class ProjectController {
  //#region routes functions
  async create(
    req: Request<ParamsDictionary, unknown, ProjectCreateObj>,
    res: Response
  ) {
    const { project, projectParticipations } = req.body;
    const projectObj = JSON.parse(project);
    const projectParticipationsObj = JSON.parse(projectParticipations);
    const archives = new Array<{
      file: Express.Multer.File;
      filePath: string;
    }>();
    const files = req.files;
    let result: ProjectOutput;
    try {
      const picture: Express.Multer.File = files["picture"]
        ? files["picture"][0]
        : null;
      const background_picture: Express.Multer.File = files[
        "background_picture"
      ]
        ? files["background_picture"][0]
        : null;
      if (picture) {
        projectObj.picture = fileUtils.getDefaultFileNameAndPath(
          picture.originalname
        );
        archives.push({ file: picture, filePath: projectObj.picture });
      }
      if (background_picture) {
        projectObj.background_picture = fileUtils.getDefaultFileNameAndPath(
          background_picture.originalname
        );
        archives.push({
          file: background_picture,
          filePath: projectObj.background_picture,
        });
      }
      result = await Project.create(projectObj);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: e });
    }
    try {
      console.log(archives);
      projectParticipationsObj.forEach(
        (project) => (project.project_id = result.id)
      );
      await ProjectParticipation.bulkCreate(projectParticipationsObj);
      fileUtils.saveImages(archives);
      return res
        .status(200)
        .json({
          message:
            "Project created successfully and project participation requests sent to users",
        });
    } catch (e) {
      console.log(e);
      await Project.destroy({ where: { id: result.id } });
      const filePaths = archives.map((x) => x.filePath);
      fileUtils.deleteImages(filePaths);
      return res.status(400).json({ error: e });
    }
  }
  async createProjectParticipation(
    req: Request<ParamsDictionary, unknown, Array<ProjectParticipationInput>>,
    res: Response
  ) {
    const projectParticipation = req.body;
    try {
      await ProjectParticipation.bulkCreate(projectParticipation);
      return res.status(200).json({ message: "Project participations sent" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: e });
    }
  }
  async acceptProjectParticipation(
    req: Request<ParamsDictionary, unknown, ProjectAcceptReject>,
    res: Response
  ) {
    try {
      await ProjectController.updateProjectParticipation(
        req,
        isAcceptedTypes.accepted
      );
      return res
        .status(200)
        .json({ message: "Project participation accepted" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: e });
    }
  }
  async rejectProjectParticipation(
    req: Request<ParamsDictionary, unknown, ProjectAcceptReject>,
    res: Response
  ) {
    try {
      await ProjectController.updateProjectParticipation(
        req,
        isAcceptedTypes.rejected
      );
      return res
        .status(200)
        .json({ message: "Project participation rejected" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: e });
    }
  }
  async getProjectParticipation(
    req: Request<ParamsDictionary, unknown, unknown>,
    res: Response
  ){
    try{
        const results = await ProjectParticipation.findAll({where:{user_id : req.session.user.id}});
        return res.status(200).json(results);
    }catch(e){
        console.log(e);
        return res.status(400).json({error: e});
    }
  }
  async searchProjects(
    req: Request<ParamsDictionary, unknown, ProjectSearchReq>,
    res: Response
  ) {
    try{
      const term = req.body.search_term;
      const results = await Project.findAll({where: {name:{
        [Op.like]: `%${term}%`
      }}});
      return res.status(200).json(results);
    }catch(e){
      console.log(e);
      return res.status(400).json({error:e});
    }
    
  }
  //#endregion

  //#region not-route methods
  private static async updateProjectParticipation(
    req: Request<ParamsDictionary, unknown, ProjectAcceptReject>,
    is_acccepted: isAcceptedTypes
  ) {
    return await ProjectParticipation.update(
      {
        is_accepted: isAcceptedTypes[is_acccepted],
      },
      {
        where: {
          project_id: req.body.project_id,
          user_id: req.session.user.id,
        },
      }
    );
  }
  //#endregion
}
const projectController = new ProjectController();
export default projectController;
