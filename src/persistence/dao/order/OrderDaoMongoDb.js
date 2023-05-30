import mongoose from "mongoose";
import orderSchema from "../../../store/MongoDb/models/order.js";
import orderFormatDTO from "../../dto/order.js";

class OrderDaoMongoDb {
  constructor() {
    this.order = mongoose.model("order", orderSchema);
  }

  init() {
    console.log("Order dao in Mongo -> ready!");
  }

  disconnect() {
    console.log("Order dao in Mongo -> closed!");
  }

  async save(obj) {
    try {
      const order = await this.order.create(obj);
      return orderFormatDTO(order);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getById(id) {
    try {
      const order = await this.order.findById(id);
      const orderFormatted = orderFormatDTO(order);
      return orderFormatted;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getByEmail(email) {
    try {
      const orders = await this.order.find({ buyer_email: email });
      return orders;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getAll() {
    try {
      const order = await this.order.find();
      return order;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteById(id) {
    try {
      const order = await this.order.findByIdAndDelete(id);
      if (!order) return null;
      return id;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteAll() {
    try {
      return await this.order.find().delete();
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async updateById(id, newObj) {
    try {
      const order = await this.order.findByIdAndUpdate(id, newObj);
      if (!order) return null;
      return { id, ...newObj };
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}
export default OrderDaoMongoDb;
