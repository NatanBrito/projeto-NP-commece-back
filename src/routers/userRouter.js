import { Router } from "express";
import { validateToken } from "../middlewares/validateTokenMiddleware.js";
import { getUser, getAllUsers } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/user", validateToken, getUser);
userRouter.get("/all-users", getAllUsers);

export default userRouter;
