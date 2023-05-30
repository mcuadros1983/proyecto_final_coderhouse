import MessagesService from "../01_business/messagesService.js";
import { logger } from "../12_utils/index.js";

const getAllMessages = async (req, res) => {
  try {
    // const messages = await MessagesService.getMessages(
    //   req.cookies.userIdCookie
    // );
    const messages = await MessagesService.getMessages();
    console.log("mensajes", messages);
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
      // console.log("status2");
      // console.log(
      //   "varios",
      //   req.cookies.cartIdCookie,
      // );
      res.render("./pages/chat.ejs", {
        messages,
        cartId: req.cookies.cartIdCookie,
        categories: req.cookies.categoriesCookie,
        userId: req.cookies.userIdCookie,
        userImage: req.user.image,
      });
      //console.log("mensajes", messages);
    }
  } catch (err) {
    console.log("error conexion");
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
    // const messages = await MessagesService.getMessages(
    //   req.cookies.userIdCookie
    // );
    const messages = await MessagesService.getMessages(); 
    console.log("mensajes", messages);
    if (!messages) {
      res.json("no encontrados");
    } else {
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      // console.log("status2");
      // console.log(
      //   "varios",
      //   req.cookies.cartIdCookie,
      // );
      res.json(messages)
      //console.log("mensajes", messages);
    }
  } catch (err) {
    console.log("error conexion");
    res.json("error del servidor")
  }
};

const getMessagesByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await MessagesService.getMessagesByUserId(id);  
    console.log("data messages", messages)
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
    console.log("error_publicacion");
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
    console.log("ubicacion del error")
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
