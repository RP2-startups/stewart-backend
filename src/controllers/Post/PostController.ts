import { ParamsDictionary } from "express-serve-static-core";
import { Request, Response } from "express";
import Post from '../../models/Post/Post';
import { fileUtils } from "../../utils/FileUtils";
import { UserSession } from "../../models/User/UserAttributes";
import ProjectParticipation from "../../models/Project/ProjectParticipation";
import Project from "../../models/Project/Project";
import Follow from "../../models/Follow/Follow";

interface PostCreateObj{
    post: string
}

declare module 'express-session' {
    interface SessionData {
      user: UserSession;
    }
}

class PostController{

    async create(
        req: Request<ParamsDictionary, unknown, PostCreateObj>,
        res: Response
      ) {
        const archives = new Array<{
            file: Express.Multer.File;
            filePath: string;
          }>();
        const {post} = req.body;
        const postObj = JSON.parse(post);
        const userParticipation = await ProjectParticipation.findAll({
            where:{
                is_adm: true,
                user_id: req.session.user.id,
                is_accepted: "accepted"
            }
        });

        if(!userParticipation)
            return res.status(400).json({error: "Usuário não autorizado a criar novo projeto"});

        const file = req.file;
        try{
            const picture: Express.Multer.File = file
              ? file
              : null;
              if (picture) {
                postObj.picture = fileUtils.getDefaultFileNameAndPath(
                  picture.originalname
                );
                archives.push({ file: picture, filePath: postObj.picture });
              }
            const result = await Post.create(postObj);
            fileUtils.saveImages(archives);
            return res.status(200).json("Post created!");
        }catch(e){
            console.log(e);
            fileUtils.deleteImages(archives.map(x => x.filePath));
            return res.status(400).json({error:e});
        }
      }

    async listPosts(req: Request<ParamsDictionary, unknown, unknown>,
        res: Response
      ) {
        const projectIdString = req.params["id"];
        const projectId = parseInt(projectIdString);
        try{
            const posts = await Post.findAll({
                where:{
                    project_id : projectId
                }
            });
            return res.status(200).json(posts);
        }catch(e){
            console.log(e);
            return res.status(400).json({error:e});
        }
    }
    async listUserPosts(req: Request<ParamsDictionary, unknown, unknown>,
        res: Response
      ) {
        try{
            const posts = await Post.findAll({
                include:[
                    {
                        model: Project,
                        as: 'project',
                        required:true,
                        include:[
                            {
                                required:true,
                                attributes:['user_id'],
                                model: ProjectParticipation,
                                as: 'projectParticipations',
                                where:{
                                    user_id : req.session.user.id,
                                    is_accepted : "accepted"
                                }
                            }
                        ]
                    }
                ]
            });
            const posts2 = await Post.findAll({
                include:[
                    {
                        required:true,
                        model: Project,
                        as: 'project',
                        include:[
                            {
                                required:true,
                                attributes:['user_id'],
                                model: Follow,
                                as: 'projectFollowers',
                                where:{
                                    user_id : req.session.user.id
                                }
                            }
                        ]
                    }
                ]
            });
            return res.status(200).json(posts.concat(posts2));
        }catch(e){
            console.log(e);
            return res.status(400).json({error : e});
        }
      }
}
const postController = new PostController()
export default postController;