import express from "express";
import chalk from "chalk";
import cors from "cors";
import { MongoClient, ObjectId} from "mongodb";
import dotenv from "dotenv";
import joi from "joi";
import bcrypt from "bcrypt";
import dayjs from "dayjs";

const app= express();
app.use(cors());
app.use(express.json());
dotenv.config();

const mongoClient= new MongoClient("mongodb://localhost:27017");
let Ecommerce;
const promise= mongoClient.connect();
promise.then(()=>{
    Ecommerce=mongoClient.db("Ecommerce");
    console.log(chalk.bold.blue(" data base em pé"))
})


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(chalk.bold.green("Silencio, estamos no AR!!!"));  });

