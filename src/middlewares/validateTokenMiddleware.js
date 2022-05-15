import db from "../db.js";
import {ObjectId} from "mongodb"

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send("Token nao encontrado");
  const token = authorization.replace("Bearer", "").trim();

  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) return res.status(401).send("Sessao nao encontrada");
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(session.userId) });
    if (!user) return res.status(401).send("usuario nao encontrado");
    res.locals.user = user;
  } catch (e) {
    console.log(e)
  }
  next()
}