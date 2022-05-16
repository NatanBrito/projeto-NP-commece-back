import db from "../db.js";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
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
export async function getMyProducts(req,res){
  const user= res.locals.user;
  try{
  res.send(user.myProducts)
  }catch(e){
    res.status(500).send("erro no getMyProducts")
  }
}
export async function deleteMyProduct(req,res){
  const user= res.locals.user;
  const {today}=req.params;
  if(parseInt(today)=== 100){
    try{
      await db.collection("users").updateOne({email:user.email},{$set:{myProducts:[]}});
      res.status(200).send("ok")
      console.log("apagado")
    }catch(e){
      res.status(409).send("error delete")
      console.log("erro")
    }
    return;
  }
  console.log(user) 
  try{
    await db.collection("users").updateOne({email:user.email},{$pull:{myProducts:{today:parseInt(today)}}});
    res.status(200).send("ok")
    console.log("apagado")
  }catch(e){
    res.status(500).send("error delete")
  }
}
export async function PostsendDone(req,res){
  const user= res.locals.user;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: "cinelli.dev@gmail.com",
  from: 'natanismaelbrito@gmail.com', // Use the email address or domain you verified above
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>conferindo a mensagem</strong>',
};
//ES6
sgMail
  .send(msg)
  .then(async () => {
    try {
      await sgMail.send(msg);
      console.log("deu certo")
    } catch (error) {
      console.error(error);
  
      if (error.response) {
        console.error(error.response.body)
      }
    }
  });
//ES8
}