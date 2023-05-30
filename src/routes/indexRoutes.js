import { Router } from "express";
import JWTAuth from "../middleware/jwt.middleware.js";
import productsService from "../business/productsService.js";
import categoryService from "../business/categoryService.js"
import usersService from "../business/usersService.js";
import cartRouter from "./cartRoutes.js";
import productRouter from "./productsRoutes.js";
import userRouter from "./usersRoutes.js";
import orderRouter from "./orderRoutes.js";
import messageRouter from "./messagesRoutes.js";
import { logger } from "../utils/index.js";
import authRouter from "./authRoutes.js";

const router = Router();

router.get("/", JWTAuth, async (req, res) => {   
  try {
    const products = await productsService.getProducts()
    const user = req.user;
    const categories = await categoryService.getCategories() 
    const { cart_id } = await usersService.getUserById(req.user.id) 
    res.status(200);
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res
      .cookie("cartIdCookie", cart_id, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 300000),
      })
      .cookie("userIdCookie", user.id, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 300000),
      })
      .cookie("categoriesCookie", categories, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 300000),
      })
      .render("index.ejs", {
        sectionTitle: "Productos",
        products,
        cartId: cart_id,
        categories,
        userId: user.id,
      });
  } catch (err) {
    res.status(500);
    logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/error.ejs", {
      code: 500,
      message: "Internal Server Error",
    });
  }
});
 
router.use("/auth", authRouter);
router.use("/user", JWTAuth, userRouter);
router.use("/consultas", JWTAuth, messageRouter);
router.use("/api/cart", JWTAuth, cartRouter);
router.use("/api/products", productRouter);
router.use("/api/order", JWTAuth, orderRouter);


router.use((req, res) => {
  res.status(404);
  logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
  res.render("./pages/error.ejs", {
    code: 404,
    message: "Not Found",
  });
});

export default router;
