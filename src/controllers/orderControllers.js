import OrderService from "../business/orderService.js";
import UsersService from "../business/usersService.js";
import { logger, sendMailTo } from "../utils/index.js";
import CartService from "../business/cartService.js";

const getOrders = async (req, res) => {
  try {
    const orders = await OrderService.getOrders();

    if (!orders || orders.length == 0) {
      res.json("ordenes no encontrados");
    } else {
      res.json(orders);
    }
  } catch (err) {
    res.json("error interno del servidor");
  }
};

const getAllOrdersByBuyerEmail = async (req, res) => {
  try {
    const ordenes = await OrderService.getOrders();
    const { email } = req.user;
    const orders = await OrderService.getOrdersByEmail(email);
    if (!orders) {
      res.status(404);
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 404,
        message: "Orders Not Found",
      });
    } else {
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/order.ejs", {
        orders,
        cartId: req.cookies.cartIdCookie,
        categories: req.cookies.categoriesCookie,
        userId: req.cookies.userIdCookie,
      });
    }
  } catch (err) {
    res.status(500);
    logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/error.ejs", {
      code: 500,
      message: "Internal Server Error",
    });
  }
};
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderService.getOrderById(id);
    if (!order) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(404).render("./pages/error.ejs", {
        code: 404,
        message: "Order Not Found",
      });
    } else {
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/single-ordersaved.ejs", {
        order,
        cartId: req.cookies.cartIdCookie,
        categories: req.cookies.categoriesCookie,
        userId: req.cookies.userIdCookie,
      });
    }
  } catch (err) {
    res.status(500);
    logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/error.ejs", {
      code: 500,
      message: "Internal Server Error",
    });
  }
};

const createOrder = async (req, res) => {
  const { body } = req;
  if (Object.entries(body).length == 0 || Object.entries(body).length < 3) {
    res.status(422);
    logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/error.ejs", {
      code: 422,
      message: "Error al obtener los atributos del carrito correctamente",
    });
  } else {
    try {
      const cart = await CartService.getCartById(req.cookies.cartIdCookie);
      if (cart.products.length < 1) {
        res.status(422);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 422,
          message:
            "Debe añadir al menos un producto al carrito para realizar la compra",
        });
      } else {
        const { state } = body;
        const newOrder = await OrderService.createOrder(
          state,
          req.cookies.cartIdCookie
        );
        // sendMailTo(
        //   newOrder.buyer_email,
        //   "Compraste en Store",
        //   `Tu compra se ha realizado correctamente. Tu número de order es ${newOrder.id}`
        // );
        res.status(200);
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/single-order.ejs", {
          purchase_date: newOrder.purchase_date,
          order: newOrder,
          cartId: req.cookies.cartIdCookie,
          categories: req.cookies.categoriesCookie,
          userId: req.cookies.userIdCookie,
        });
      }
    } catch (err) {
      res.status(500);
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
      });
    }
  }
};

export { getOrders, getAllOrdersByBuyerEmail, getOrderById, createOrder };
