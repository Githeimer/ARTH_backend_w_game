import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import teamRoutes from "./routes/team.routes.js";
import scoreUpdate from "./routes/score.routes.js";
import playerRoutes from "./routes/player.routes.js";
import DecodingDecode from "./routes/decodingDecade.routes.js";
import Khoji from "./routes/khoji.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();
const PORT = process.env.PORT;

app.use("/u", userRoutes);
app.use("/t", teamRoutes);
// app.use("/", scoreUpdate);
app.use("/decodingdecade", DecodingDecode);
app.use("/p", playerRoutes);
app.use("/game", Khoji);

app.listen(PORT, () => {
  console.log(`Backend Running at PORT: ${PORT}`);
});
