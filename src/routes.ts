import { Router } from 'express';
import { profile } from './middlewares/upload/profile.js';
import multer from 'multer';
import { userController } from './controllers/User/UserController.js';
import sessionChecker from './middlewares/authentication/SessionChecker.js';
import projectController from './controllers/Project/ProjectController.js';

const routes = Router();
const fileUploader = multer(profile.config);

routes.post("/user", fileUploader.single("profileImage"), userController.create);
routes.post("/login", userController.login);
routes.post("/logout", userController.logout);
routes.get("/user", sessionChecker.DefaultSessionChecker, userController.getUser);
routes.get("/users", userController.getUsers);

routes.post("/project", sessionChecker.DefaultSessionChecker, fileUploader.fields([{name:"picture", maxCount:1}, {name: "background_picture", maxCount:1}]), projectController.create);
routes.get("/projects", projectController.searchProjects);
routes.post("/projectParticipation/accept", sessionChecker.DefaultSessionChecker, projectController.acceptProjectParticipation);
routes.post("/projectParticipation/reject", sessionChecker.DefaultSessionChecker, projectController.rejectProjectParticipation);
routes.post("/projectParticipation", sessionChecker.DefaultSessionChecker, projectController.createProjectParticipation);
routes.get("/projectParticipation", sessionChecker.DefaultSessionChecker, projectController.getProjectParticipation);


export default routes;
