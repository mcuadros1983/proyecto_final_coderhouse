import UsersService from "../01_business/usersService.js";
import { client, logger, sendMailTo } from "../12_utils/index.js";

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
    // const {
    //   user: { _id },
    // } = req;
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
    console.log("userdata", body, file)

    if (!file) {
      res.status(400);
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 400,
        message: "Please upload a file",
      });
    } else {
      console.log("testing")
      const createdUser = await UsersService.createUser(body, file);
      console.log("data", createdUser);
      if (createdUser == null) {
        console.log("undefined", createdUser)
        res.status(409);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 409,
          message: "User already exists",
        });
      } else {
        // console.log("data2", createdUser)
        //res.json(createdUser)
        // await sendMailTo(
        //   //process.env.ADMIN_MAIL,
        //   process.env.NODEMAILER_USER ,
        //   "Nuevo registro de usuario",
        //   "Se ha registrado un nuevo usuario."
        // );
        // client.messages.create({
        //   body: "Se ha registrado un nuevo usuario.",
        //   from: process.env.TWILIO_PHONE,
        //   to: process.env.ADMIN_PHONE,
        // });

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
      res.json("Usuario no encontrado");
      // res.status(404);
      // logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      // res.render("./pages/error.ejs", {
      //   code: 404,
      //   message: "User Not Found",
      // });
    } else {
      console.log(newUser)
      const updatedUser = await UsersService.updateUserById(
        id,
        newUser
      );
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.json({ updatedUser });
    }
  } catch (err) {
    res.json("Error interno del servidor");
    // res.status(500);
    // logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    // res.render("./pages/error.ejs", {
    //   code: 500,
    //   message: "Internal Server Error",
    // });
  }
};

const getUsers = async (req, res) => { 
  // const { id } = req.params;
  // if (id) {
  //   try {
  //     const user = await UsersService.getUserById(id);
  //     // console.log("test0", user);
  //     if (!user) {
  //       res.json("usuario no encontrado")
  //       // res.status(404);
  //       // logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
  //       // res.render("./pages/error.ejs", {
  //       //   code: 404,
  //       //   message: "Product Not Found",
  //       // });
  //     } else {
  //       res.json(user)
  //       // res.status(200);
  //       // logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
  //       // res.render("./pages/single-product.ejs", {
  //       //   product,
  //       //   cartId: req.cookies.cartIdCookie,
  //       //   categories: req.cookies.categoriesCookie,
  //       //   userId: req.cookies.userIdCookie,
  //       // });
  //     }
  //   } catch (err) {
  //     res.json("error interno del servidor")
  //     // console.log("test1");
  //     // res.status(500);
  //     // logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
  //     // res.render("./pages/error.ejs", {
  //     //   code: 500,
  //     //   message: "Internal Server Error",
  //     // });
  //   }
  // } else {
    try {
      const users = await UsersService.getUsers();
      // console.log("test2");
      // console.log("test2.1", users.length);

      if (!users || users.length == 0) {
        res.json("usuarios no encontrados")
        // res.status(404);
        // logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        // res.render("./pages/error.ejs", {
        //   code: 404,
        //   message: "Products Not Found",
        // });
      } else {
        // res.status(200);
        // logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.json(users);
      }
    } catch (err) {
      res.json("error interno del servidor")
      // console.log("test3");
      // res.status(500);
      // logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      // res.render("./pages/error.ejs", {
      //   code: 500,
      //   message: "Internal Server Error",
      // });
    }
  }
// };

export { renderLoginView, renderRegisterView, getUserById, createUser, logout, updateUserById, getUsers };
