import { Router } from 'express';
import { profile } from './middlewares/upload/profile.js';
import multer from 'multer';
import { userController } from './controllers/User/UserController.js';

const routes = Router();

routes.post("/user", multer(profile.config).single("profileImage"), userController.create);

export default routes;
