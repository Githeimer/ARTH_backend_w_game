import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import testRoutes from "./routes/test.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();
const PORT = process.env.PORT;

app.use("/auth", authRoutes);
app.use("/test", testRoutes);
app.use("/u", userRoutes);

app.listen(PORT, () => {
  console.log(`Backend Running at PORT: ${PORT}`);
});
