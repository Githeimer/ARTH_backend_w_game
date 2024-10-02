import { Router as router } from "express";
import {
  RegisterByTeamCreation,
  RegisterByTeamCode,
} from "../controllers/userController.js";
const Router = router();

Router.post("/register/create", RegisterByTeamCreation);

Router.post("/register/join", RegisterByTeamCode);

export default Router;
