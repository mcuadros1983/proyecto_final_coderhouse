import { Router } from "express";
import {
  renderLoginView,
  renderRegisterView,
  createUser,
  logout,
} from '../controllers/usersControllers.js'
import upload from "../config/multer.js";
import loginMiddleware from '../middleware/loginMiddleware.js'

const authRouter = Router();

// [GET] 🌐/auth/login
authRouter.get("/login", renderLoginView);

// [POST] 🌐/auth/login
authRouter.post("/login", loginMiddleware);

// [GET] 🌐/auth/logout
authRouter.get("/logout", logout);

// [GET] 🌐/auth/register
authRouter.get("/register", renderRegisterView);

// [POST] 🌐/auht/register
authRouter.post("/register", upload.single("image"), createUser);

export default authRouter;
