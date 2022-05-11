import express from "express";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";
import authRouter from "./routers/authRouter.js";

import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.use(authRouter);

const port = 5000;
app.listen(port, () => {
  console.log(chalk.bold.green("Silencio, estamos no AR!!!"));
});
