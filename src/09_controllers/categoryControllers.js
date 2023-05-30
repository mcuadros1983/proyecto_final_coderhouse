import CategoryService from "../01_business/categoryService.js";
//import { logger } from "../12_utils/index.js";

const getCategories = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const category = await CategoryService.getCategoryById(id);
      // console.log("test0", category);
      if (!category) {
        res.json("Category not found")
        // res.status(404);
        // logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        // res.render("./pages/error.ejs", {
        //   code: 404,
        //   message: "Category Not Found",
        // });
      } else {
        res.json(category)
        // res.status(200);
        // logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        // res.render("./pages/single-category.ejs", {
        //   category,
        //   cartId: req.cookies.cartIdCookie,
        //   categories: req.cookies.categoriesCookie,
        //   userId: req.cookies.userIdCookie,
        // });
      }
    } catch (err) {
        res.json("Error en el servidor")
    //   console.log("test1");
    //   res.status(500);
    //   logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    //   res.render("./pages/error.ejs", {
    //     code: 500,
    //     message: "Internal Server Error",
    //   });
    }
  } else {
    try {
      const categories = await CategoryService.getCategories();
      // console.log("test2");
      // console.log("test2.1", categories.length);

      if (!categories || categories.length == 0) {
        res.json("Categories not found")
        // res.status(404);
        // logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        // res.render("./pages/error.ejs", {
        //   code: 404,
        //   message: "Categories Not Found",
        // });
      } else {
        // res.status(200);
        // logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.json(categories);
      }
    } catch (err) {
    //   console.log("test3");
    //   res.status(500);
    //   logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    //   res.render("./pages/error.ejs", {
    //     code: 500,
    //     message: "Internal Server Error",
    //   });
    res.json("Error en el servidor")
    }
  }
};

const getCategoryByName = async (req, res) => {
    const { categoryName } = req.params;
      try {
        const category = await CategoryService.getCategoryByName(categoryName);
        console.log("test0", category);
        if (!category) {
          res.json("Category not found")
          // res.status(404);
          // logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
          // res.render("./pages/error.ejs", {
          //   code: 404,
          //   message: "Category Not Found",
          // });
        } else {
          res.json(category)
          // res.status(200);
          // logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
          // res.render("./pages/single-category.ejs", {
          //   category,
          //   cartId: req.cookies.cartIdCookie,
          //   categories: req.cookies.categoriesCookie,
          //   userId: req.cookies.userIdCookie,
          // });
        }
      } catch (err) {
          res.json("Error en el servidor")
      //   console.log("test1");
      //   res.status(500);
      //   logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      //   res.render("./pages/error.ejs", {
      //     code: 500,
      //     message: "Internal Server Error",
      //   });
      }
  };


const createCategory = async (req, res) => { 
  const { body } = req;
  console.log("body", body)
  if (Object.entries(body).length == 0 || Object.entries(body).length < 1) {
    res.json("No se pudieron obtener los atributos")
    // res.status(422);
    // logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    // res.render("./pages/error.ejs", {
    //   code: 422,
    //   message: "No se pudo obtener los atributos del categoryo correctamente",
    // });
  } else {
    try {
      const createdCategory = await CategoryService.createCategory(body);
    //   res.status(201);
    //   logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.json({ createdCategory });
    } catch (err) {
    //   res.status(500);
    //   logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    //   res.render("./pages/error.ejs", {
    //     code: 500,
    //     message: "Internal Server Error",
    //   });
        res.json("Error en el servidor")
    }
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const newCategory = req.body;
    const category = await CategoryService.getCategoryById(id);
    if (!category) {
      /*res.status(404);
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 404,
        message: "Category Not Found",
      });*/
      res.json("Category Not Found")
    } else {
      const updatedCategory = await CategoryService.updateCategoryById(
        id,
        newCategory
      );
      /*res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);*/
      res.json({ updatedCategory });
    }
  } catch (err) {
    /*res.status(500);
    logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/error.ejs", {
      code: 500,
      message: "Internal Server Error",
    });*/
    res.json("Error en el servidor")
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryService.getCategoryById(id);
    if (!category) {
      /*res.status(404);
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 404,
        message: "Category Not Found",
      });*/
      res.json("Category not found")
    } else {
      const deletedCategory = await CategoryService.deleteCategoryById(id);
      // res.status(200);
      // logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      res.json({ deletedCategory });

    }
  } catch (err) {
    /*
    res.status(500);
    logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/error.ejs", {
      code: 500,
      message: "Internal Server Error",
    });*/
    res.json("Error en el servidor")
  }
};

export {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategoryById,
  getCategoryByName
};
