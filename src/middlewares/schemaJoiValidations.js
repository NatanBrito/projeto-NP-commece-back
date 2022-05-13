import joi from "joi";
import db from "../db.js";

export async function validateRegister(req, res, next) {
  const body = req.body;
  const schema = joi.object({
    name: joi.string().alphanum().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    confirm: joi.ref("password"),
  });
  const { value, error } = schema.validate(body);

  if (error) {
    const errorsDetails = error.details.map((object) => {
      return object.message;
    });
    return res.status(400).send(errorsDetails);
  }
  try {
    const users = await db.collection("users").find({}).toArray();
    const userExistent = users.find((user) => user.email === body.email);
    if (userExistent) {
      return res.status(409).send("Usuário já existente");
    }
  } catch (e) {
    console.log(e);
  }
  next();
}

export async function validateMyProduct(req, res, next) {
  const body = req.body
  const schema = joi.object({
    category: joi.string().required(),
    description: joi.string().required(),
    id: joi.number().required(),
    image: joi.string().required(),
    price: joi.number().required(),
    rating: joi.any(),
    title: joi.string().required(),
    _id: joi.any()
  })

  const {value, error} = schema.validate(body)
  if(error) {
    console.log(error.details)
    return res.status(400).send("Não foi possível adicionar o produto")
  }
  next()
}
