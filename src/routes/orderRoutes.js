import { Router } from "express";
import {
  getAllOrdersByBuyerEmail,
  getOrderById,
  createOrder,
  getOrders
} from "../controllers/orderControllers.js";

const orderRouter = Router();

// [GET] 🌐/api/order
orderRouter.get("/", getAllOrdersByBuyerEmail);  

// [GET] 🌐/api/order/:id
orderRouter.get("/:id", getOrderById);

// [POST] 🌐/api/order
orderRouter.post("/", createOrder);   


export default orderRouter;
