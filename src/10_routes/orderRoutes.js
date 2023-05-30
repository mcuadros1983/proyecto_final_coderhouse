import { Router } from "express";
import {
  getAllOrdersByBuyerEmail,
  getOrderById,
  createOrder,
  getOrders
} from "../09_controllers/orderControllers.js";

const orderRouter = Router();

// [GET] 🌐/api/order
orderRouter.get("/", getAllOrdersByBuyerEmail);  

// [GET] 🌐/api/order/:id
orderRouter.get("/:id", getOrderById);

// [POST] 🌐/api/order
orderRouter.post("/", createOrder);   

// [POST] 🌐/api/order/ordenes/ordenes
orderRouter.get("/ordenes/ordenes", getOrders);  

// [GET] 🌐/ordenes/

export default orderRouter;
