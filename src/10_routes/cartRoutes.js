import { Router } from "express";
import { 
  getProductsByCartId,
  createCart,
  addProductToCart,
  deleteCartById,
  deleteProductFromCart,
  getCarts
} from "../09_controllers/cartControllers.js";

const cartRouter = Router();

// [GET] 🌐/api/cart/:id/products
cartRouter.get("/:id/products", getProductsByCartId);

// [POST] 🌐/api/cart
cartRouter.post("/", createCart);

// [POST] 🌐/api/cart/:id/products/:id_prod
cartRouter.post("/:id/products/:id_prod", addProductToCart);   

// [DELETE] 🌐/api/cart/:id/delete
cartRouter.post("/:id/delete", deleteCartById);

// [DELETE] 🌐/api/cart/:id/products/:id_prod/delete
cartRouter.post("/:id/products/:id_prod/delete", deleteProductFromCart);

// [GET] 🌐/api/carts/
cartRouter.get("/", getCarts);

export default cartRouter;

