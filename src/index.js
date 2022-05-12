import express from "express";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routers/authRouter.js";
import productsRouter from "./routers/productsRouter.js"

import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.use(authRouter);
app.use(productsRouter)

const port = 5000;
app.listen(port, () => {
  console.log(chalk.bold.green("Silencio, estamos no AR!!!"));
});
