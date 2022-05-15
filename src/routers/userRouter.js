import { Router } from "express";
import { validateToken } from "../middlewares/validateTokenMiddleware.js";
import { getUser } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/user", validateToken, getUser);

export default userRouter;
