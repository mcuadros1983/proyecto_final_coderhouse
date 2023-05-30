import { errorCodes } from "../middleware/errors/errorDictionary.js";
import ProductsRepository from "../persistence/repository/productsRepository.js";
import CategoryService from "./categoryService.js";

const productsRepo = new ProductsRepository();

const createProduct = async (product) => { 
  try { 
    const category = await CategoryService.getCategoryByName(
      product.category
    );
    if (!category || category.length < 1) {
      await CategoryService.createCategory({ name: product.category });
    }
    return await productsRepo.save(product);
  } catch (err) {
    throw new Error(err?.message);
  }
};

const getProducts = async () => {  
  try {
    return await productsRepo.getAll();
  } catch (err) {
    throw new Error(err?.message);
  }
};

const getProductById = async (id) => { 
  try {
    return await productsRepo.getById(id);
  } catch (err) {
    throw new Error(err?.message);
  }
};

const getProductsByCategory = async (category) => {
  try {
    return await productsRepo.getByCategory(category);
  } catch (err) {
    throw new Error(err?.message);
  }
};

const updateProductById = async (id, product) => {
  try {
    const updatedProduct = await productsRepo.updateById(id, product);
    if (!updatedProduct) throw new Error(errorCodes.PRODUCT_NOT_FOUND);
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

const deleteProductById = async (id) => {
  try {
    const productId = await productsRepo.deleteById(id);
    if (!productId) throw new Error(errorCodes.PRODUCT_NOT_FOUND);
    return productId;
  } catch (error) {
    throw error;
  }
};

export default {
  createProduct,
  getProducts,
  getProductById,
  getProductsByCategory,
  updateProductById,
  deleteProductById,
};
