import CartService from "../01_business/cartService.js";
import ProductsService from "../01_business/productsService.js";
import { logger } from "../12_utils/index.js";

const getCarts = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const cart = await CartService.getCartById(id);
      // console.log("test0", product);
      if (!cart) {
        res.json("Cart Not Found")
        // res.status(404);
        // logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        // res.render("./pages/error.ejs", {
        //   code: 404,
        //   message: "Product Not Found",
        // });
      } else {
        res.json(cart)
        // res.status(200);
        // logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        // res.render("./pages/single-product.ejs", {
        //   product,
        //   cartId: req.cookies.cartIdCookie,
        //   categories: req.cookies.categoriesCookie,
        //   userId: req.cookies.userIdCookie,
        // });
      }
    } catch (err) {
      // console.log("test1");
      // res.status(500);
      // logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      // res.render("./pages/error.ejs", {
      //   code: 500,
      //   message: "Internal Server Error",
      // });
      res.json("Error en el servidor")
    }
  } else {
    try {
      const carts = await CartService.getCarts();
      console.log("data carts", carts)
      // console.log("test2.1", products.length);

      if (!carts || carts.length == 0) {
        res.json("Carts Not Found")
        // res.status(404);
        // logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        // res.render("./pages/error.ejs", {
        //   code: 404,
        //   message: "Products Not Found",
        // });
      } else {
        // res.status(200);
        // logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.json(carts);
      }
    } catch (err) {
      // console.log("test3");
      // res.status(500);
      // logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      // res.render("./pages/error.ejs", {
      //   code: 500,
      //   message: "Internal Server Error",
      // });
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
  console.log("punto0")
  try {
    const {
      params: { id, id_prod },
    } = req;
    console.log("punto0.0", id, id_prod)
    
    const product = await ProductsService.getProductById(id_prod);
    const cart = await CartService.getCartById(id);
    console.log("punto0.1", product, cart)
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
    console.log("test0", product, cart)
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
    console.log("dcart1")
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
