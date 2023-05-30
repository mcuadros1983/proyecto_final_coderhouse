import mongoose from "mongoose";
import usersSchema from "../../../11_store/MongoDb/models/users.js";
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
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const user = await this.users.findById(id);
      console.log("usuario replier buscado", id, user)
      const userFormatted = usersFormatDTO(user);
      return userFormatted;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getByEmail(email) {
    try {
      const user = await this.users.findOne({ email: email });

      const userFormatted = usersFormatDTO(user);
      return userFormatted;
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
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      const user = await this.users.findByIdAndDelete(id);
      if (!user) return null;
      return id;
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    try {
      return await this.users.find().delete();
    } catch (error) {
      throw error;
    }
  }

  async updateById(id, newObj) {
    try {
      const user = await this.users.findByIdAndUpdate(id, newObj);
      if (!user) return null;
      return { id, ...newObj };
    } catch (error) {
      throw error;
    }
  }
}
export default UsersDaoMongoDb;
