import { Router as router } from "express";
import { TeamStatus } from "../controllers/teamController.js";

const Router = router();

Router.post("/team/:id", TeamStatus);

export default Router;
