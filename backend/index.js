import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import testRoutes from "./routes/test.routes.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
dotenv.config();



const PORT = process.env.PORT;





app.use(testRoutes);


app.listen(PORT,()=>{
    console.log(`Backend Running at PORT: ${PORT}`);
})

