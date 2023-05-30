import UsersService from "../business/usersService.js";
import { client, logger, sendMailTo } from "../utils/index.js";

const renderLoginView = async (req, res) => {
  try {
    res.status(200);
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/login.ejs");
  } catch (err) {
    res.status(500);
    logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/error.ejs", {
      code: 500,
      message: "Internal Server Error",
    });
  }
};

const renderRegisterView = async (req, res) => {
  try {
    res.status(200);
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/register.ejs");
  } catch (err) {
    res.status(500);
    logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/error.ejs", {
      code: 500,
      message: "Internal Server Error",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await UsersService.getUserById(id);
    if (!user) {
      res.status(404);
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 404,
        message: "User Not Found",
      });
    }
    res.status(200);
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/user.ejs", {
      user: user,
      cartId: user.cart_id,
      categories: req.cookies.categoriesCookie,
      userId: req.cookies.userIdCookie,
    });
  } catch (err) {
    res.status(500);
    logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/error.ejs", {
      code: 500,
      message: "Internal Server Error",
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { body } = req;
    const { file } = req;

    if (!file) {
      res.status(400);
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 400,
        message: "Please upload a file",
      });
    } else {
      const createdUser = await UsersService.createUser(body, file);
      if (createdUser == null) {
        res.status(409);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 409,
          message: "User already exists",
        });
      } else {
        await sendMailTo(
          process.env.NODEMAILER_USER,
          "Nuevo registro de usuario",
          "Se ha registrado un nuevo usuario."
        );
        client.messages.create({
          body: "Se ha registrado un nuevo usuario.",
          from: process.env.TWILIO_PHONE,
          to: process.env.ADMIN_PHONE,
        });

        res.status(302);
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.redirect("/auth/login");
      }
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

const logout = async (req, res) => {
  try {
    res.status(302);
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res
      .clearCookie("token")
      .clearCookie("cartIdCookie")
      .clearCookie("categoriesCookie")
      .clearCookie("userIdCookie")
      .redirect("/");
  } catch (err) {
    res.status(500);
    logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/error.ejs", {
      code: 500,
      message: "Internal Server Error",
    });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const newUser = req.body;
    const user = await UsersService.getUserById(id);
    if (!user) {
      res.status(404);
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 404,
        message: "User Not Found",
      });
    } else {
      console.log(newUser);
      const updatedUser = await UsersService.updateUserById(id, newUser);
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.json({ updatedUser });
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

const getUsers = async (req, res) => {
  try {
    const users = await UsersService.getUsers();

    if (!users || users.length == 0) {
      res.json("usuarios no encontrados");
    } else {
      res.json(users);
    }
  } catch (err) {
    res.json("error interno del servidor");
  }
};

export {
  renderLoginView,
  renderRegisterView,
  getUserById,
  createUser,
  logout,
  updateUserById,
  getUsers,
};
