import { MongoClient } from "mongodb";
import "dotenv/config";
import chalk from "chalk";

let db;
try {
  const mongoClient = new MongoClient("mongodb://localhost:27017");
  const promise = await mongoClient.connect().then(() => {
  db = mongoClient.db("Ecommerce");
  console.log(chalk.bold.blue(" data base em pé"))
  });
} catch (e) {
  console.log("Erro ao conectar ao MongoDB", e)
}

export default db