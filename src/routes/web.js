import express from "express";
import homeController from '../controller/homeController';
const router = express.Router();



const initwebRoutes = (app) => {
    router.get("/", homeController.handleHelloWorld);
    router.get("/users", homeController.handleUserPage);
    router.post("/users/create-user", homeController.handleCreateNewUser);
    return app.use("/", router);
}
export default initwebRoutes;