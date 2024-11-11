import { Router as router } from "express";
import {
  getGameData,
  UpdateGameData,
} from "../controllers/khoji.controller.js";

const Router = router();
Router.patch("/khoji", UpdateGameData);
Router.get("/khoji/:playerCode", getGameData);

export default Router;
