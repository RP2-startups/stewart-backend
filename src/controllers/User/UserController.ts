import {Request, Response} from 'express';
import { ParamsDictionary } from "express-serve-static-core";
import User from '../../models/User.js';
import { RegisterUser } from '../../requestModels/RegisterUser.js';
import { fileUtils } from '../../utils/FileUtils.js';

class UserController{
    async create(req: Request<ParamsDictionary, unknown, RegisterUser>, res: Response){
        let profileImage : Express.Multer.File;
        const archives = new Array<Express.Multer.File>();
        // console.log(req);
        try{
            const registerUserObj = req.body;
            if(req.file){
                profileImage = req.file;
                archives.push(profileImage);
            }
            registerUserObj.profile_picture = fileUtils.getDefaultFileNameAndPath(profileImage.originalname);
            console.log(registerUserObj);
            await User.create(registerUserObj);
            fileUtils.saveImages(archives);
            return res.status(200).json({message: "User created successfully!"})
        }catch(e){
            console.log(e);
            const filePaths = archives.map(x => fileUtils.getDefaultFileNameAndPath(x.originalname));
            fileUtils.deleteImages(filePaths);
        }
    }
}
export const userController = new UserController();