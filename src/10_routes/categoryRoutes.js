import { Router } from "express";
import {
  getCategories,
  getCategoryByName,
  createCategory,
  updateCategory,
  deleteCategoryById,
} from "../09_controllers/categoryControllers.js";

const categoriesRouter = Router();

// [GET] 🌐/api/categories/:id?
categoriesRouter.get("/:id?", getCategories);

// [GET] 🌐/api/categories/:categoryName
categoriesRouter.get("/:categoryName", getCategoryByName);

// [POST] 🌐/api/categories/
categoriesRouter.post("/", createCategory); 

// [PUT] 🌐/api/categories/:id
categoriesRouter.put("/:id", updateCategory);

// [DELETE] 🌐/api/categories/:id
categoriesRouter.delete("/:id", deleteCategoryById);

export default categoriesRouter;
