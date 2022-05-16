import { Router } from "express";
import { getProducts, postProduct, getMyProducts, deleteMyProduct, PostsendDone } from "../controllers/productsController.js";
import { validateMyProduct } from "../middlewares/schemaJoiValidations.js";
import { validateToken } from "../middlewares/validateTokenMiddleware.js";

const productsRouter = Router();

productsRouter.get("/products", getProducts);
productsRouter.post("/products", validateMyProduct, validateToken, postProduct);
productsRouter.get("/myproducts", validateToken, getMyProducts);
productsRouter.delete("/deletemyproducts/:id", validateToken, deleteMyProduct);
productsRouter.post("/senddone", validateToken, PostsendDone);

export default productsRouter;
