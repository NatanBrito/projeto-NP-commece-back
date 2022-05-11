import db from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
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
export async function postSignIn(req,res){
const {email,password}=req.body;
 try{
    const user= await db.collection("users").findOne({email});
    if(user && bcrypt.compareSync(password,user.password)){
      const secretJwtPassword= process.env.JWT_PASSWORD;
      const dataUser={email,password};
      const configuracoes = { expiresIn: 60*60*24*30 };// esta pra 30 dias 
      const token=jwt.sign(dataUser,secretJwtPassword,configuracoes)
      res.status(200).send(token)
    }
 }catch(e){
   res.status(401).send(e)
  }
}