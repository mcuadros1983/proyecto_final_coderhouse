import { errorCodes } from "../07_middleware/errors/errorDictionary.js";
import UsersRepository from "../02_persistence/repository/usersRepository.js";
import CartService from "./cartService.js";
import bcrypt from 'bcrypt'

const usersRepo = new UsersRepository(); 

const createUser = async (body, file) => {
  try {
    const { username, email, age, address, phone, password } = body;
    const users = await usersRepo.getAll()
    console.log("ALL", users)
    const usertest = await usersRepo.getByUsername(username)
    console.log("ONE", usertest)
    const user = await usersRepo.getByUsername(username);
    console.log("searching", user)


    if (user) {
      console.log("creating0", user)
      return user; // Already exist a user with that username
    }

    if (!user || user == null) {
      console.log("creating");
      const hashedPassword = await bcrypt.hash(password, 8); // Encrypting the password
      const userCart = await CartService.createCart({
        email: email,
        products: [],
        delivery_address: address,
        total: 0,
      }); // Create a cart for this user
      const newUser = {
        username,
        email,
        age,
        address,
        image: file.filename,
        phone,
        password: hashedPassword,
        cart_id: userCart.id,
        messages: [],
      };
      console.log("usersearch", newUser);
      return await usersRepo.save(newUser);
    }


  } catch (err) {
    throw new Error(err?.message);
  }
}

const getUserByUsername = async (username) => {
  try {
    await usersRepo.getByUsername(username);
  } catch (err) {
    throw new Error(err?.message);
  }
};

//
const getUserById = async (id) => {
  try {
    const user = await usersRepo.getById(id);
    console.log("looking user", user)
    return user;
  } catch (err) {
    throw new Error(err?.message);
  }
};


const addMessageToUser = async (id, message) => {
  try {
    const user = await getUserById(id);

    
    if (Array.isArray(message)) {
      user.messages = message
    } else {
      user.messages = [...user.messages, message];
    }

    return await updateUserById(id, user); 
  } catch (err) {
    throw new Error(err?.message);
  }
};

const updateUserById = async (id, user) => { 
  try {
    const updatedUser = await usersRepo.updateById(id, user);

    return updatedUser;
  } catch (err) {
    throw new Error(err?.message);
  }
};

const getUsers = async () => {  
  try {
    return await usersRepo.getAll(); 
  } catch (err) {
    throw new Error(err?.message);
  }
};

export default {
  createUser,
  getUserByUsername,
  getUserById,
  addMessageToUser,
  getUsers, 
  updateUserById
};
