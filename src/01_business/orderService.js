import { errorCodes } from "../07_middleware/errors/errorDictionary.js";
import OrderRepository from "../02_persistence/repository/orderRepository.js";
import CartService from "./cartService.js";
import generatePurchaseDate from "../12_utils/generatePurchaseDate.js";

const orderRepo = new OrderRepository();


const createOrder = async (state, cartId) => {
  console.log("corder3", state, cartId);
  try {
    const cart = await CartService.getCartById(cartId);
    console.log("corder4", cart.email, cart.products);
    const emailOrder = cart.email;

    const productsOrder = [...cart.products];
    let total = 0;
    productsOrder.forEach((productOrder) => {
      total = total + productOrder.price * productOrder.in_cart;
    });
    const order = {
      products: productsOrder,
      state,
      purchase_date: generatePurchaseDate(new Date(Date.now())),
      buyer_email: emailOrder,
      total,
    };
    console.log("corder5", order, order.products);
    await CartService.deleteCartById(cartId);
    console.log("corder6", cartId);
    return await orderRepo.save(order);
  } catch (err) {
    throw new Error(err?.message);
  }
};


const getOrders = async () => {
  try {
    return await orderRepo.getAll();
  } catch (err) {
    throw new Error(err?.message);
  }
};

//
const getOrderById = async (id) => {
  try {
    const order = await orderRepo.getById(id);

    return order;
  } catch (err) {
    throw new Error(err?.message);
  }
};

//
const getOrdersByEmail = async (buyer_email) => {
  try {
    const orders = await orderRepo.getAll();
    const ordersEmail = orders.filter(
      (order) => order.buyer_email == buyer_email
    );
    return ordersEmail;
  } catch (err) {
    throw new Error(err?.message);
  }
};

export default {
  createOrder,
  getOrders,
  getOrderById,
  getOrdersByEmail,
};
