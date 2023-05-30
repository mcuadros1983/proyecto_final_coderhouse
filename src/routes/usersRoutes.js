import { Router } from "express";
import { getUserById, updateUserById } from "../controllers/usersControllers.js";

const userRouter = Router();

// [GET] 🌐/user/:id
userRouter.get("/", getUserById);

// [PUT] 🌐/user/:id
userRouter.put("/:id", updateUserById); 

export default userRouter;
