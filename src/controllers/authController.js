import db from "../db.js";
import bcrypt from "bcrypt";

export async function postRegister(req, res) {
  const body = req.body;

  try {
    const encryptedPassword = bcrypt.hashSync(body.password, 10);
    await db.collection("users").insertOne({
      name: body.name,
      email: body.email,
      password: encryptedPassword,
      confirm: body.confirm,
    });
    res.sendStatus(201);
  } catch (e) {
    res.status(500).send(e);
  }
}
