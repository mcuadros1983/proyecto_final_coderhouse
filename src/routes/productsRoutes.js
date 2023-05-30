import { Router } from "express";
import {
  getProducts,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProductById,
} from "../controllers/productsControllers.js";

const productsRouter = Router();

// [GET] 🌐/api/products/:id?
productsRouter.get("/:id?", getProducts);

// [GET] 🌐/api/products/category/:category
productsRouter.get("/category/:category", getProductsByCategory); 

// [POST] 🌐/api/products/
productsRouter.post("/", createProduct);  

// [PUT] 🌐/api/products/:id
productsRouter.put("/:id", updateProduct);

// [DELETE] 🌐/api/products/:id
productsRouter.delete("/:id", deleteProductById);

export default productsRouter;
