import OrderService from "../01_business/orderService.js";
import UsersService from "../01_business/usersService.js";
import { logger, sendMailTo } from "../12_utils/index.js";
import CartService from "../01_business/cartService.js";

const getOrders = async (req, res) => {
  try {
    const orders = await OrderService.getOrders();
    // console.log("test2");
    // console.log("test2.1", users.length);

    if (!orders || orders.length == 0) {
      res.json("ordenes no encontrados");
      // res.status(404);
      // logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      // res.render("./pages/error.ejs", {
      //   code: 404,
      //   message: "Products Not Found",
      // });
    } else {
      // res.status(200);
      // logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.json(orders);
    }
  } catch (err) {
    res.json("error interno del servidor");
    // console.log("test3");
    // res.status(500);
    // logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    // res.render("./pages/error.ejs", {
    //   code: 500,
    //   message: "Internal Server Error",
    // });
  }
};

const getAllOrdersByBuyerEmail = async (req, res) => {
  try {
    const ordenes = await OrderService.getOrders();
    console.log("ordenes", ordenes);
    const { email } = req.user;
    console.log("email search", email);
    const orders = await OrderService.getOrdersByEmail(email);
    console.log("datos", orders, orders);
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
    console.log("order error");
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
      console.log("carrito creado", cart)
      if (cart.products.length < 1) {
        res.status(422);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 422,
          message: "Debe añadir al menos un producto al carrito para realizar la compra",
        });
      } else {
        const { state } = body;
        console.log("corder1", state);
        const newOrder = await OrderService.createOrder(
          state,
          req.cookies.cartIdCookie
        );
        sendMailTo(
          newOrder.buyer_email,
          "Compraste en Store",
          `Tu compra se ha realizado correctamente. Tu número de order es ${newOrder.id}`
        );
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
      console.log("corder2");
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
      });
    }
  }
};

export { getOrders, getAllOrdersByBuyerEmail, getOrderById, createOrder };
