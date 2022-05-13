import { Router } from "express";
import { getProducts, postProduct } from "../controllers/productsController.js";
import { validateMyProduct } from "../middlewares/schemaJoiValidations.js";
import { validateToken } from "../middlewares/validateTokenMiddleware.js";

const productsRouter = Router();

productsRouter.get("/products", getProducts);
productsRouter.post("/products", validateMyProduct, validateToken, postProduct);

export default productsRouter;
