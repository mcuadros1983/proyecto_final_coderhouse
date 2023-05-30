import { Router } from "express";
import {
  getAllMessages,
  getAllMessages2,
  getMessagesByUserId,
  createMessage,
  addReplyToMessageById,
} from "../controllers/messagesControllers.js";

const messageRouter = Router();

// [GET] 🌐/consultas
messageRouter.get("/", getAllMessages); 

messageRouter.get("/mensajes", getAllMessages2); 

// [GET] 🌐/consultas/:id
messageRouter.get("/user/:id", getMessagesByUserId); 

// [POST] 🌐/consultas
messageRouter.post("/", createMessage);    

// [POST] 🌐/consultas/:id/reply
messageRouter.post("/:id/reply", addReplyToMessageById); 

export default messageRouter;
