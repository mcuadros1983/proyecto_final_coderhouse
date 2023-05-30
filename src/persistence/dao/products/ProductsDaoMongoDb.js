import mongoose from "mongoose";
import productsSchema from "../../../store/MongoDb/models/products.js"; 
import productsFormatDTO from "../../dto/products.js";

class ProductsDaoMongoDb {
  constructor() {
    this.products = mongoose.model("products", productsSchema);
  }

  init() {
    console.log("Products dao in Mongo -> ready!");
  }

  disconnect() {
    console.log("Products dao in Mongo -> closed!");
  }

  async save(obj) {
    try {
      const product = await this.products.create(obj);
      return product;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getById(id) {
    try {
      const product = await this.products.findById(id);
      const productFormatted = productsFormatDTO(product);
      return productFormatted;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getByCategory(category){
    try {
      const products = await this.products.find({ category: category });
      return products;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getAll() {
    try {
      const products = await this.products.find();
      const productsFormatted = productsFormatDTO(products);
      return productsFormatted;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteById(id) {
    try {
      const product = await this.products.findByIdAndDelete(id);
      if (!product) return null;
      return id;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteAll() {
    try {
        return await this.products.find().delete();
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async updateById(id, newObj) {
    try {
      const product = await this.products.findByIdAndUpdate(id, newObj);
      if (!product) return null;
      return { id, ...newObj };
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}
export default ProductsDaoMongoDb;
