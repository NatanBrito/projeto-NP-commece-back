import db from "../db.js"

export async function getUser(req, res) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send("Token nao encontrado");
  const token = authorization.replace("Bearer", "").trim();

  try {
    const session = await db.collection("sessions").findOne({token: token})
    const user = await db.collection("users").findOne({_id: session.userId})

    return res.send(user.name)
  } catch(e) {
    console.log(e, "Erro no getUser")
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await db.collection("users").find({}).toArray();
    users.map((user) => {
      return (
        user._id = "You should not be looking this :)",
        user.myProducts = "You should not be looking this :)",
        user.confirm = "You should not be looking this :)",
        user.endereco = "You should not be looking this :)"
      )
    })
    console.log(users)
    res.send(users)
  } catch(e) {
    console.log(e, "Erro no getAllUsers")
  }
}