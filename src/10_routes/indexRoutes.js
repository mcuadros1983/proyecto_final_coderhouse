import { Router } from "express";
import JWTAuth from "../07_middleware/jwt.middleware.js";
import productsService from "../01_business/productsService.js";
import categoryService from "../01_business/categoryService.js"
import usersService from "../01_business/usersService.js";
import cartRouter from "./cartRoutes.js";
import productRouter from "./productsRoutes.js";
import userRouter from "./usersRoutes.js";
import orderRouter from "./orderRoutes.js";
import messageRouter from "./messagesRoutes.js";
import categoryRouter from "./categoryRoutes.js"
import { logger } from "../12_utils/index.js";
import authRouter from "./authRoutes.js";

const router = Router();

router.get("/", JWTAuth, async (req, res) => {   
  try {
    const products = await productsService.getProducts()
    console.log("products", products)
    const user = req.user;
    console.log("user", user)
    const categories = await categoryService.getCategories() 
    console.log("indexCategories", categories)
    const usuario = await usersService.getUserById(req.user.id) 
    console.log("testing_user", usuario)
    const { cart_id } = await usersService.getUserById(req.user.id) 
    console.log("cart_id", cart_id)
    console.log("datos", user, user.id, req.user)
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
    console.log("error")
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

router.use("/user2", userRouter);
router.use("/consultas2", messageRouter); 
router.use("/category", categoryRouter); 
router.use("/cart", cartRouter);


router.use((req, res) => {
  res.status(404);
  logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
  res.render("./pages/error.ejs", {
    code: 404,
    message: "Not Found",
  });
});

export default router;
