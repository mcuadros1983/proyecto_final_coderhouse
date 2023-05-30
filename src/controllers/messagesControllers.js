import MessagesService from "../business/messagesService.js";
import { logger } from "../utils/index.js";

const getAllMessages = async (req, res) => {
  try {
    const messages = await MessagesService.getMessages();
    if (!messages) {
      res.status(404);
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 404,
        message: "Message Not Found",
      });
    } else {
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/chat.ejs", {
        messages,
        cartId: req.cookies.cartIdCookie,
        categories: req.cookies.categoriesCookie,
        userId: req.cookies.userIdCookie,
        userImage: req.user.image,
      });
    }
  } catch (err) {
    res.status(500);
    logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/error.ejs", {
      code: 500,
      message: "Internal Server Error",
    });
  }
};

const getAllMessages2 = async (req, res) => {
  try {
    const messages = await MessagesService.getMessages();
    if (!messages) {
      res.json("no encontrados");
    } else {
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.json(messages);
    }
  } catch (err) {
    res.json("error del servidor");
  }
};

const getMessagesByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await MessagesService.getMessagesByUserId(id);
    if (!messages) {
      res.status(404);
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 404,
        message: "Message Not Found",
      });
    } else {
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/mis-consultas.ejs", {
        messages,
        cartId: req.cookies.cartIdCookie,
        categories: req.cookies.categoriesCookie,
        userId: req.cookies.userIdCookie,
        userImage: req.user.image,
      });
    }
  } catch (err) {
    res.status(500);
    logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/error.ejs", {
      code: 500,
      message: "Internal Server Error",
    });
  }
};

const createMessage = async (req, res) => {
  try {
    const { body } = req;
    const messages = await MessagesService.createMessage(
      body,
      req.cookies.userIdCookie
    );
    res.status(200);
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/chat.ejs", {
      messages,
      cartId: req.cookies.cartIdCookie,
      categories: req.cookies.categoriesCookie,
      userId: req.cookies.userIdCookie,
      userImage: req.user.image,
    });
  } catch (err) {
    res.status(500);
    logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/error.ejs", {
      code: 500,
      message: "Internal Server Error",
    });
  }
};

const addReplyToMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const messages = await MessagesService.addReplyToMessageById(
      id,
      body,
      req.cookies.userIdCookie
    );
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.status(200).render("./pages/chat.ejs", {
      messages,
      cartId: req.cookies.cartIdCookie,
      categories: req.cookies.categoriesCookie,
      userId: req.cookies.userIdCookie,
      userImage: req.user.image,
    });
    res.redirect("/consultas");
  } catch (err) {
    res.status(500);
    logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/error.ejs", {
      code: 500,
      message: "Internal Server Error",
    });
  }
};

export {
  getAllMessages,
  getMessagesByUserId,
  createMessage,
  addReplyToMessageById,
  getAllMessages2,
};
