import express from "express";
import homeController from "../controllers/homeController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/home", homeController.getHomePage);
  router.get("/crud", homeController.getcrud);
  router.post("/post-crud", homeController.postcrud);

  return app.use("/", router);
};
module.exports = initWebRoutes;
