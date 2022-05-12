import db from "../db.js";
import dotenv from "dotenv";
dotenv.config();

export async function getProducts(req, res) {
  try {
    const products = await db.collection('products').find({}).toArray()
    res.status(200).send(products)
  } catch(e) {
    res.status(400).send("Não foi possível buscar os produtos")
  }
}