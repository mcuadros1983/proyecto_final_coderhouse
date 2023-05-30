import { Router } from "express";
import { getUserById, updateUserById, getUsers } from "../09_controllers/usersControllers.js";

const userRouter = Router();

// [GET] 🌐/user/:id
userRouter.get("/", getUserById);

// [GET] 🌐/user/users
userRouter.get("/users", getUsers); 

// [PUT] 🌐/user/:id
userRouter.put("/:id", updateUserById); 

export default userRouter;
