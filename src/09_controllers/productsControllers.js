import ProductsService from "../01_business/productsService.js";
import { logger } from "../12_utils/index.js";

const getProducts = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const product = await ProductsService.getProductById(id);
      // console.log("test0", product);
      if (!product) {
        res.status(404);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 404,
          message: "Product Not Found",
        });
      } else {
        res.status(200);
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/single-product.ejs", {
          product,
          cartId: req.cookies.cartIdCookie,
          categories: req.cookies.categoriesCookie,
          userId: req.cookies.userIdCookie,
        });
      }
    } catch (err) {
      // console.log("test1");
      res.status(500);
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
      });
    }
  } else {
    try {
      const products = await ProductsService.getProducts();
      // console.log("test2");
      // console.log("test2.1", products.length);

      if (!products || products.length == 0) {
        res.status(404);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 404,
          message: "Products Not Found",
        });
      } else {
        res.status(200);
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.json(products);
      }
    } catch (err) {
      // console.log("test3");
      res.status(500);
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
      });
    }
  }
};

const getProductsByCategory = async (req, res) => {
  const { category } = req.params;

  try {

    console.log("category", category)

    const products = await ProductsService.getProductsByCategory(category
    );
   
    if (!products || products.length == 0) {
      res.status(404);
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 404,
        message: `Products of ${category} Not Found`,
      });
    } else {
      console.log("test4", req.cookies.categoriesCookie)
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("index.ejs", {
        products,
        cartId: req.cookies.cartIdCookie,
        categories: req.cookies.categoriesCookie,
        sectionTitle: category,
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

const createProduct = async (req, res) => {  
  const { body } = req;

  if (Object.entries(body).length == 0 || Object.entries(body).length < 6) {
    res.status(422);
    logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/error.ejs", {
      code: 422,
      message: "No se pudo obtener los atributos del producto correctamente",
    });
  } else {
    try {
      const createdProduct = await ProductsService.createProduct(body);
      res.status(201);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.json({ createdProduct });
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

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const newProduct = req.body;
    const product = await ProductsService.getProductById(id);
    if (!product) {
      res.status(404);
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 404,
        message: "Product Not Found",
      });
    } else {
      const updatedProduct = await ProductsService.updateProductById(
        id,
        newProduct
      );
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.json({ updatedProduct });
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

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductsService.getProductById(id);
    if (!product) {
      res.status(404);
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 404,
        message: "Product Not Found",
      });
    } else {
      const deletedProduct = await ProductsService.deleteProductById(id);
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.json({ deletedProduct });

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

export {
  getProducts,
  createProduct,
  getProductsByCategory,
  updateProduct,
  deleteProductById,
};
