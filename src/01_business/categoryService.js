import { errorCodes } from "../07_middleware/errors/errorDictionary.js";
import CategoryRepository from "../02_persistence/repository/categoryRepository.js";

const categoryRepo = new CategoryRepository();


const createCategory = async (category) => categoryRepo.save(category);

//
const getCategories = async () => {
  try {
    return await categoryRepo.getAll();
  } catch (err) {
    throw new Error(err?.message);
  }
};

//
const getCategoryById = async (id) => {
  try {
    const category = await categoryRepo.getById(id);
    if (!category) throw new Error(errorCodes.CATEGORY_NOT_FOUND);
    return category;
  } catch (err) {
    throw new Error(err?.message);
  }
};

const getCategoryByName = async(category_name)=> {
  try {
    const category =  await categoryRepo.getByName(category_name);

    return category
  } catch (err) {
    throw new Error(err?.message);
  }
}

export default {
  createCategory,
  getCategories,
  getCategoryById,
  getCategoryByName,
};
