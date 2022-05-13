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

export async function postProduct(req, res) {
  const user = res.locals.user
  const body = req.body

  try {
    await db.collection("users").updateOne({email: user.email}, { $push: { myProducts: body } })
    return res.sendStatus(200)
  } catch(e) {
    return res.status(500).send("Erro no postProduct")
  }
}