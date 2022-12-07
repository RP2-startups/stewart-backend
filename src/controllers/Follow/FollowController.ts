import Follow from "../../models/Follow/Follow";
import { ParamsDictionary } from "express-serve-static-core";
import { UserSession } from "../../models/User/UserAttributes";
import { Request, Response } from "express";

declare module 'express-session' {
    interface SessionData {
      user: UserSession;
    }
}

class FollowController{
    async create(
        req: Request<ParamsDictionary, unknown, unknown>,
        res: Response
      ) {
        try{
            const projectId = parseInt(req.params['id']);
            const result = await Follow.create({
                project_id: projectId,
                user_id: req.session.user.id
            });
            return res.status(200).json({message: "seguido"});
        }catch(e){
            console.log(e);
            return res.status(400).json({error:e});
        }
        
    }
    async checkFollow(
        req: Request<ParamsDictionary, unknown, unknown>,
        res: Response
      ) {
        try{
            const projectId = parseInt(req.params['id']);
            const result = await Follow.findAll({
                where:{
                    project_id: projectId,
                    user_id: req.session.user.id
                }
            });
            return res.status(200).json({message: (result ? true : false)});
        }catch(e){
            console.log(e);
            return res.status(400).json({error:e});
        }
      }
}
const followController = new FollowController();
export default followController;