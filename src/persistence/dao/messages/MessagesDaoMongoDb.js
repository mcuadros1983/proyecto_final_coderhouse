import mongoose from "mongoose";
import { messagesSchema } from "../../../store/MongoDb/models/messages.js";
import messagesFormatDTO from "../../dto/messages.js";

class MessagesDaoMongoDb {
  constructor() {
    this.messages = mongoose.model("messages", messagesSchema);
  }

  init() {
    console.log("Messages dao in Mongo -> ready!");
  }

  disconnect() {
    console.log("Messages dao in Mongo -> closed!");
  }

  async save(obj) {
    try {
      const messages = await this.messages.create(obj);
      return messages;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getById(id) {
    try {
      const messages = await this.messages.findById(id);
      const messageFormated = messagesFormatDTO(messages);
      return messageFormated;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getAll() {
    try {
      const messages = await this.messages.find({});
      return messagesFormatDTO(messages);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteById(id) {
    try {
      const messages = await this.messages.findByIdAndDelete(id);
      if (!messages) return null;
      return id;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteAll() {
    try {
      return await this.messages.find().delete();
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async updateById(id, newObj) {
    try {
      const messages = await this.messages.findByIdAndUpdate(id, newObj);
      if (!messages) return null;
      return { id, ...newObj };
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}
export default MessagesDaoMongoDb;
