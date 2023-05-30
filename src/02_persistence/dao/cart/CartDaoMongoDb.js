import mongoose from "mongoose";
import cartSchema from "../../../11_store/MongoDb/models/cart.js";
import cartFormatDTO from "../../dto/cart.js";
import productsFormatDTO from "../../dto/products.js";
import productSchema from "../../../11_store/MongoDb/models/products.js";


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
      //return cart;
      return cartFormatDTO(cart);
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const cart = await this.cart.findById(id);

      const cartFormatted = cartFormatDTO(cart);

      return cartFormatted;
    } catch (error) {
      throw error;
    }

  }

  async getAll() {
    try {
      const cart = await this.cart.find();
      const cartFormatted = cartFormatDTO(cart);
      return cartFormatted;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      const cart = await this.cart.findByIdAndDelete(id);
      if (!cart) return null;
      return id;
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    try {
      return await this.cart.find().delete();
    } catch (error) {
      throw error;
    }
  }

  async updateById(id, newObj) {
    try {
      const cart = await this.cart.findByIdAndUpdate(id, newObj);
      if (!cart) return null;
      return { id, ...newObj };
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cart_id, product, total) { 
    try {
      console.log("nuevos datos", cart_id, product, total);

      const cart = await this.cart.findById(cart_id)
      console.log("carrito nuevo", cart)

      const product2 = await this.products.findById(product.id)
      console.log("producto nuevo", product2)

      const { products } = await this.cart.findOne(
        { _id: cart_id },
        {
          products: { $elemMatch: { _id: product.id } },
        }
      );
      console.log("encontrado", products);
      if (products.length > 0) {
        console.log("nueva ubicacion")
        await this.deleteProductFromCart(cart_id, product.id);
      }
      console.log("accediendo return", cart_id, product, total)
      return await this.cart.findByIdAndUpdate(
        { _id: cart_id },
        { $push: { products: product }, total }
      );
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteProductFromCart(cart_id, product_id) {
    console.log("borrando el producto del carrito")
    try {
      const { products } = await this.cart.findOne(
        { _id: cart_id },
        {
          products: { $elemMatch: { _id: product_id } },
        }
      );
      let { total } = await getById(cart_id);
      const newTotal = total - products[0].price * products[0].in_cart;
      await this.cart.updateOne(
        { _id: cart_id },
        {
          $pull: { products: { _id: product_id } },
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
