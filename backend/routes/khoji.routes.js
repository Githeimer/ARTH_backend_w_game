import { Router as router } from "express";
import { UpdateGameData } from "../controllers/khoji.controller.js";

const Router = router();
Router.patch("/khoji", UpdateGameData);

export default Router;
