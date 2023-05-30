import CategoryService from "../business/categoryService.js";

const getCategories = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const category = await CategoryService.getCategoryById(id);
      if (!category) {
        res.json("Category not found");
      } else {
        res.json(category);
      }
    } catch (err) {
      res.json("Error en el servidor");
    }
  } else {
    try {
      const categories = await CategoryService.getCategories();
      if (!categories || categories.length == 0) {
        res.json("Categories not found");
      } else {
        res.json(categories);
      }
    } catch (err) {
      res.json("Error en el servidor");
    }
  }
};

const getCategoryByName = async (req, res) => {
  const { categoryName } = req.params;
  try {
    const category = await CategoryService.getCategoryByName(categoryName);
    if (!category) {
      res.json("Category not found");
    } else {
      res.json(category);
    }
  } catch (err) {
    res.json("Error en el servidor");
  }
};

const createCategory = async (req, res) => {
  const { body } = req;
  if (Object.entries(body).length == 0 || Object.entries(body).length < 1) {
    res.json("No se pudieron obtener los atributos");
  } else {
    try {
      const createdCategory = await CategoryService.createCategory(body);
      res.json({ createdCategory });
    } catch (err) {
      res.json("Error en el servidor");
    }
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const newCategory = req.body;
    const category = await CategoryService.getCategoryById(id);
    if (!category) {
      res.json("Category Not Found");
    } else {
      const updatedCategory = await CategoryService.updateCategoryById(
        id,
        newCategory
      );
      res.json({ updatedCategory });
    }
  } catch (err) {
    res.json("Error en el servidor");
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryService.getCategoryById(id);
    if (!category) {
      res.json("Category not found");
    } else {
      const deletedCategory = await CategoryService.deleteCategoryById(id);
      res.json({ deletedCategory });
    }
  } catch (err) {
    res.json("Error en el servidor");
  }
};

export {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategoryById,
  getCategoryByName,
};
