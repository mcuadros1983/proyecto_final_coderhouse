import mongoose from "mongoose";
import usersSchema from "../../../store/MongoDb/models/users.js";
import usersFormatDTO from "../../dto/users.js";

class UsersDaoMongoDb {
  constructor() {
    this.users = mongoose.model("users", usersSchema);
  }

  init() {
    console.log("Users dao in Mongo -> ready!");
  }

  disconnect() {
    console.log("Users dao in Mongo -> closed!");
  }

  async save(obj) {
    try {
      const user = await this.users.create(obj);
      return user;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getById(id) {
    try {
      const user = await this.users.findById(id);
      const userFormatted = usersFormatDTO(user);
      return userFormatted;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getByEmail(email) {
    try {
      return await this.users.findOne({ email });
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getByUsername(username) {
    try {
      return await this.users.findOne({ username });
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getAll() {
    try {
      const users = await this.users.find({});
      return users;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteById(id) {
    try {
      const user = await this.users.findByIdAndDelete(id);
      if (!user) return null;
      return id;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteAll() {
    try {
      return await this.users.find().delete();
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async updateById(id, newObj) {
    try {
      const user = await this.users.findByIdAndUpdate(id, newObj);
      if (!user) return null;
      return { id, ...newObj };
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}
export default UsersDaoMongoDb;
