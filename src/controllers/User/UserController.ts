import {Request, Response} from 'express';
import { ParamsDictionary } from "express-serve-static-core";
import User from '../../models/User/User.js';
import { UserInput, UserLogin, UserSession } from '../../models/User/UserAttributes.js';
import { fileUtils } from '../../utils/FileUtils.js';
import bcrypt from 'bcrypt';
import cryptoUtils from '../../utils/CryptoUtils.js';
import { Op } from 'sequelize';

declare module 'express-session' {
    interface SessionData {
      user: UserSession;
    }
  }

interface UsersQuery{
    email:string,
    name:string
}

class UserController{
    async create(req: Request<ParamsDictionary, unknown, UserInput>, res: Response){
        let profileImage : Express.Multer.File;
        const archives = new Array<{file:Express.Multer.File, filePath: string}>();
        try{
            const registerUserObj = req.body;
            if(req.file){
                profileImage = req.file;
                registerUserObj.profile_picture = fileUtils.getDefaultFileNameAndPath(profileImage.originalname);
                archives.push({file:profileImage, filePath: registerUserObj.profile_picture});
            }
            registerUserObj.password = cryptoUtils.EncryptPassword(registerUserObj.password);
            await User.create(registerUserObj);
            fileUtils.saveImages(archives);
            return res.status(200).json({message: "User created successfully!"})
        }catch(e){
            console.log(e);
            const filePaths = archives.map(x => x.filePath);
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
                    req.session.user = {
                        id: result.id,
                        name: result.name,
                        email: result.email,
                        profile_picture: result.profile_picture,
                        about: result.about
                    };
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
    async getUsers(req: Request<ParamsDictionary, unknown, unknown, UsersQuery>, res: Response){
        try{
            const users = await User.findAll({
              attributes: ["id", "email"],
              where: {
                [Op.or]: 
                  [
                    {
                      name: {
                        [Op.like]: `%${req.query.name}%`,
                      },
                    },
                    {
                      email: {
                        [Op.like]: `%${req.query.email}%`,
                      },
                    },
                  ]
                }             
            });
            return res.status(200).json(users);
        }catch(e){
            console.log(e);
            return res.status(400).json({error : e});
        }
    }
    async getUser(req: Request, res: Response){
        return res.status(200).json({user: req.session.user});
    }
}
export const userController = new UserController();