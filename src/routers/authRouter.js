import { Router } from "express";
import { postRegister, postSignIn} from "../controllers/authController.js";
import { validateRegister } from "../middlewares/schemaJoiValidations.js";

const authRouter = Router();

authRouter.post("/register", validateRegister, postRegister);
authRouter.post("/sign-in",postSignIn);
export default authRouter;
