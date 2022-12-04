import { Router } from 'express';
import { profile } from './middlewares/upload/profile.js';
import multer from 'multer';
import { userController } from './controllers/User/UserController.js';

const routes = Router();

routes.post("/user", multer(profile.config).single("profileImage"), userController.create);
routes.post("/login", userController.login);
routes.post("/logout", userController.logout);

export default routes;
