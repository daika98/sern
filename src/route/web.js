import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/home", homeController.getHomePage);
  router.get("/create-crud", homeController.getcrud);
  router.post("/post-crud", homeController.postcrud);
  router.get("/list-users", homeController.showTableUsers);
  router.get("/edit-crud", homeController.editcrud);
  router.post("/put-crud", homeController.putcrud);
  router.get("/delete-crud", homeController.deletecrud);

  //API
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.put("/api/edit-user", userController.handleEditUser);

  return app.use("/", router);
};
module.exports = initWebRoutes;
