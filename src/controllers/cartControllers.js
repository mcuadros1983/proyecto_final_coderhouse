import CartService from "../business/cartService.js";
import ProductsService from "../business/productsService.js";
import { logger } from "../utils/index.js";

const getCarts = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const cart = await CartService.getCartById(id);
      if (!cart) {
        res.json("Cart Not Found")
      } else {
        res.json(cart)
      }
    } catch (err) {
      res.json("Error en el servidor")
    }
  } else {
    try {
      const carts = await CartService.getCarts();

      if (!carts || carts.length == 0) {
        res.json("Carts Not Found")
      } else {
        res.json(carts);
      }
    } catch (err) {
      res.json("Error en el servidor")
    }
  }
};


const getProductsByCartId = async (req, res) => {
  try {
    let { id } = req.params;
    let cart = await CartService.getCartById(id);
    if (!cart) {
      res.status(404);
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 404,
        message: "Cart Not Found",
      });
    }
    res.status(200);
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/cart.ejs", {  
      products: cart.products,
      cartId: req.cookies.cartIdCookie,
      cartTotal: cart.total,
      categories: req.cookies.categoriesCookie,
      userId: req.cookies.userIdCookie,
    });
  } catch (err) {
    res.status(500);
    logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/error.ejs", {
      code: 500,
      message: "Internal Server Error",
    });
  }
};

const createCart = async (req, res) => {
  const { body } = req;
  if (Object.entries(body).length == 0 || Object.entries(body).length < 1) {
    res.status(422);
    logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/error.ejs", {
      code: 422,
      message: "No se pudo obtener los atributos del carrito correctamente",
    });
  } else {
    try {
      const newCart = await CartService.createCart(body);
      res.status(201);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.json({ newCartId: newCart.id });
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

const  addProductToCart = async (req, res) => {
  try {
    const {
      params: { id, id_prod },
    } = req;
    
    const product = await ProductsService.getProductById(id_prod);
    const cart = await CartService.getCartById(id);
    if (!product) {
      res.status(404);
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 404,
        message: "Product Not Found",
      });
    }
    if (!cart) {
      res.status(404);
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 404,
        message: "Cart Not Found",
      });
    }
    await CartService.addProductToCart(id, product);
    res.status(302);
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`); 
    res.redirect(`/api/cart/${id}/products`);
  } catch (err) {
    res.status(500);
    logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/error.ejs", {
      code: 500,
      message: "Internal Server Error",
    });
  }
};

const deleteCartById = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await CartService.getCartById(id);
    if (!cart) {
      res.status(404);
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 404,
        message: "Cart Not Found",
      });
    }
    await CartService.deleteCartById(id);
    res.status(200);
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.redirect(`/api/cart/${id}/products`);
  } catch (err) {
    res.status(500);
    logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/error.ejs", {
      code: 500,
      message: "Internal Server Error",
    });
  }
};

const deleteProductFromCart = async (req, res) => {
  try {
    const { id, id_prod } = req.params;
    const product = await ProductsService.getProductById(id_prod);
    const cart = await CartService.getCartById(id);
    if (!product) {
      res.status(404);
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 404,
        message: "Product Not Found",
      });
      if (!cart) {
        res.status(404);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 404,
          message: "Cart Not Found",
        });
      }
    }
    await CartService.deleteProductFromCart(id, id_prod);
    res.status(302);
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.redirect(`/api/cart/${id}/products`);
  } catch (err) {
    res.status(500);
    logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/error.ejs", {
      code: 500,
      message: err?.message,
    });
  }
};

export {
  getProductsByCartId,
  createCart,
  addProductToCart,
  deleteCartById,
  deleteProductFromCart,
  getCarts
};
