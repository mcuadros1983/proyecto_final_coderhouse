import mongoose from "mongoose";
import cartSchema from "../../../store/MongoDb/models/cart.js";
import cartFormatDTO from "../../dto/cart.js";
import productSchema from "../../../store/MongoDb/models/products.js";

class CartDaoMongoDb {
  constructor() {
    this.cart = mongoose.model("carts", cartSchema);
    this.products = mongoose.model("products", productSchema);
  }

  init() {
    console.log("Cart dao in Mongo -> ready!");
  }

  disconnect() {
    console.log("Cart dao in Mongo -> closed!");
  }

  async save(obj) {
    try {
      const cart = await this.cart.create(obj);
      return cartFormatDTO(cart);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getById(id) {
    try {
      const cart = await this.cart.findById(id);
      const cartFormatted = cartFormatDTO(cart);
      return cartFormatted;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getAll() {
    try {
      const cart = await this.cart.find();
      const cartFormatted = cartFormatDTO(cart);
      return cartFormatted;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteById(id) {
    try {
      return await this.cart.findByIdAndUpdate(
        { _id: id },
        { $set: { products: [] }, total: 0 },
        { new: true }
      );
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteAll() {
    try {
      return await this.cart.find().delete();
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async updateById(id, newObj) {
    try {
      const cart = await this.cart.findByIdAndUpdate(id, newObj);
      return { id, ...newObj };
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async addProductToCart(cart_id, product, total) {
    try {
      const { products } = await this.cart.findOne(
        { _id: cart_id },
        {
          products: { $elemMatch: { title: product.title } },
        }
      );
      if (products.length > 0) {
        await this.deleteProductFromCart(cart_id, product.title);
      }
      return await this.cart.findByIdAndUpdate(
        { _id: cart_id },
        { $push: { products: product }, total }
      );
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteProductFromCart(cart_id, product_title) {
    try {
      const { products } = await this.cart.findOne(
        { _id: cart_id },
        {
          products: { $elemMatch: { title: product_title } },
        }
      );
      let { total } = await this.getById(cart_id);
      const newTotal = total - products[0].price * products[0].in_cart;
      await this.cart.updateOne(
        { _id: cart_id },
        {
          $pull: { products: { title: product_title } },
          $set: { total: newTotal },
        }
      );
      return products[0];
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}
export default CartDaoMongoDb;
