import {Request, Response} from 'express';
import { ParamsDictionary } from "express-serve-static-core";
import User from '../../database/models/User.js';
import { RegisterUser } from '../../requestModels/RegisterUser.js';

export class UserController{
    async Create(req: Request<ParamsDictionary, unknown, RegisterUser>, res: Response){

        const registerUserObj = req.body;
        await User.create(registerUserObj);
        return res.status(200).json({message: "User created successfully!"})
    }
}