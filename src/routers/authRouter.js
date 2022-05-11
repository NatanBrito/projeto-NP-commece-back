import { Router } from "express";
import { postRegister } from "../controllers/authController.js";
import { validateRegister } from "../middlewares/schemaJoiValidations.js";

const authRouter = Router();

authRouter.post("/register", validateRegister, postRegister);

export default authRouter;
