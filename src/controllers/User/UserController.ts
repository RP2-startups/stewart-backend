import {Request, Response} from 'express';
import { ParamsDictionary } from "express-serve-static-core";
import User from '../../models/User.js';
import { UserInput, UserLogin, UserSession } from '../../models/User/UserAttributes.js';
import { fileUtils } from '../../utils/FileUtils.js';
import bcrypt from 'bcrypt';
import cryptoUtils from '../../utils/CryptoUtils.js';

declare module 'express-session' {
    interface SessionData {
      user: UserSession;
    }
  }

class UserController{
    async create(req: Request<ParamsDictionary, unknown, UserInput>, res: Response){
        let profileImage : Express.Multer.File;
        const archives = new Array<Express.Multer.File>();
        try{
            const registerUserObj = req.body;
            if(req.file){
                profileImage = req.file;
                archives.push(profileImage);
                registerUserObj.profile_picture = fileUtils.getDefaultFileNameAndPath(profileImage.originalname);
            }
            registerUserObj.password = cryptoUtils.EncryptPassword(registerUserObj.password);
            await User.create(registerUserObj);
            fileUtils.saveImages(archives);
            return res.status(200).json({message: "User created successfully!"})
        }catch(e){
            console.log(e);
            const filePaths = archives.map(x => fileUtils.getDefaultFileNameAndPath(x.originalname));
            fileUtils.deleteImages(filePaths);
            return res.status(400).json({error: e});
        }
    }
    async login(req: Request<ParamsDictionary, unknown, UserLogin>, res: Response){
        try{
            const loginObj = req.body;
            const result = await User.findOne({where:{email: loginObj.email}});
            console.log(result)
            if(!result)
                return res.status(404).json({message:"Usuário/senha incorretos"});
            else{
                const validPass = await bcrypt.compare(loginObj.password, result.password);
                if(validPass){
                    req.session.user = result;
                    return res.status(200).json({message:"logado"});
                }
                else
                    return res.status(404).json({message:"Usuário/senha incorretos"});
            }
        }catch(e){
            console.log(e);
            return res.status(400).json({error: e});
        }
    }
    logout(req: Request<ParamsDictionary, unknown, unknown>, res: Response){
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                res.status(500).json({message:'Não foi possível deslogar'});
              } else {
                res.status(200).json({message:'Deslogado'});
              }
        });
    }
}
export const userController = new UserController();