import { Router as router } from "express";
import { AnswerCheck } from "../controllers/DecodingDecadeController.js";

const Router = router();

Router.get("/answer", AnswerCheck);

export default Router;
