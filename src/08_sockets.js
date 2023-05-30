import MessagesService from "./01_business/messagesService.js";
import { logger } from "./12_utils/index.js";

export default (io) => {
  io.on("connection", async (socket) => {
    logger.info(`${socket.id} connected.`);

    io.emit("messages", await MessagesService.getMessages());

  });
};
