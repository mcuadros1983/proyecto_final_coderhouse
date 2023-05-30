import { Router } from "express";
import {
  getAllMessages,
  getAllMessages2,
  getMessagesByUserId,
  createMessage,
  addReplyToMessageById,
} from "../09_controllers/messagesControllers.js";

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

// [POST] 🌐/consultas/:id/delete
/* messageRouter.post(
  "/user/:user_id/consulta/:message_id/delete",
  MessageController.deleteMessageById
); */

export default messageRouter;
