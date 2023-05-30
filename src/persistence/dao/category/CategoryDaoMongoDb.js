import mongoose from "mongoose";
import {categorySchema} from "../../../store/MongoDb/models/category.js"; 
import categoryFormatDTO from "../../dto/category.js";

class CategoryDaoMongoDb {
  constructor() {
    this.category = mongoose.model("category", categorySchema);
  }

  init() {
    console.log("Category dao in Mongo -> ready!");
  }

  disconnect() {
    console.log("Category dao in Mongo -> closed!");
  }

  async save(obj) {
    try {
      const category = await this.category.create(obj);
      return category;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getById(id) {
    try {
      const category = await this.category.findById(id);
      const categoryFormatted = categoryFormatDTO(category);
      return categoryFormatted;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getByName(category_name){
    try {
      const category = await this.category.findOne({ name: category_name });
      return category;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getAll() {
    try {
      const category = await this.category.find();
      const categoryFormatted = categoryFormatDTO(category);
      return categoryFormatted;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteById(id) {
    try {
      const category = await this.category.findByIdAndDelete(id);
      if (!category) return null;
      return id;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteAll() {
    try {
        return await this.category.find().delete();
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async updateById(id, newObj) {
    try {
      const category = await this.category.findByIdAndUpdate(id, newObj);
      if (!category) return null;
      return { id, ...newObj };
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}
export default CategoryDaoMongoDb;
