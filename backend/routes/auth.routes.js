import { generateJWTtoken,sendMail } from "../utilities/utils.js";
import {Router as router} from "express";

const Router= router();

Router.get("/",(req,res)=>{
   

    res.status(200).send({message:"Get route of auth"}); //test
})

export default Router;
