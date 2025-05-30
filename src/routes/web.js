import express from "express";
import homeController from '../controller/homeController';
const router = express.Router();



const initwebRoutes = (app) => {
    router.get("/", homeController.handleHelloWorld);
    router.get("/users", homeController.handleUserPage);
    router.post("/users/create-user", homeController.handleCreateNewUser);
    router.delete("/delete-user/:id", homeController.handleDeleteUser); // Xóa người dùng
    router.get("/users/update-user/:id", homeController.handleUpdateUserPage); // Trang sửa người dùng
    router.post("/users/update-user/:id", homeController.handleUpdateUser); // Cập nhật người dùng
    return app.use("/", router);
}
export default initwebRoutes;