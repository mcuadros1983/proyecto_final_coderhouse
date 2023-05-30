import mongoose from "mongoose";
import {messagesSchema} from "../../../11_store/MongoDb/models/messages.js";
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
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const messages = await this.messages.findById(id);
      console.log("message user id", messages)
      const messageFormated = messagesFormatDTO(messages)
      console.log("formateo", messageFormated)
      return messageFormated
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const messages = await this.messages.find({});
      return messagesFormatDTO(messages);
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      const messages = await this.messages.findByIdAndDelete(id);
      if (!messages) return null;
      return id;
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    try {
      return await this.messages.find().delete();
    } catch (error) {
      throw error;
    }
  }

  async updateById(id, newObj) {
    try {
      const messages = await this.messages.findByIdAndUpdate(id, newObj);
      if (!messages) return null;
      return { id, ...newObj };
    } catch (error) {
      throw error;
    }
  }
}
export default MessagesDaoMongoDb;
