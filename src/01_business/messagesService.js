import { errorCodes } from "../07_middleware/errors/errorDictionary.js";
import MessagesRepository from "../02_persistence/repository/messagesRepository.js";
import UsersService from "./usersService.js";
import { getHourAndMinutes } from "../12_utils/index.js";

const messagesRepo = new MessagesRepository();

const createMessage = async (body, user_id) => {
  try {
    const user = await UsersService.getUserById(user_id);

    const newMessage = {
      user_id,
      email: user.email,
      message: body.message,
      hour: getHourAndMinutes(new Date()),
      image: user.image,
      replies: [],
    };



    const createdMessage = await messagesRepo.save(newMessage);


    await UsersService.addMessageToUser(user_id, createdMessage);

    return createdMessage;
  } catch (err) {
    throw new Error(err?.message);
  }
};

//
const getMessages = async () => {
  try {
    return await messagesRepo.getAll();
  } catch (err) {
    throw new Error(err?.message);
  }
};

//
const getMessagesByUserId = async (userId) => {
  try {
    const user = await UsersService.getUserById(userId);
    console.log("data user", user)

    return user.messages;
  } catch (err) {
    throw new Error(err?.message);
  }
};

//
const getMessageById = async (id) => {
  try {
    console.log("messageid", id)
    const message = await messagesRepo.getById(id);
    console.log("message service", message)
    return message;
  } catch (err) {
    throw new Error(err?.message);
  }
};


const addReplyToMessageById = async (messageId, body, userReplierId) => {
  console.log("datos replier", messageId, body, userReplierId)
  try {
    const userReplier = await UsersService.getUserById(userReplierId); // replier
    console.log("userReplier", userReplier)

    const { user_id } = await getMessageById(messageId); 
    console.log("user_id_own", user_id)
    const user = await UsersService.getUserById(user_id);
    console.log("usuario principal", user)

    const newReply = {
      user_id: userReplierId, // replier
      email: userReplier.email, // replier
      message: body.message,
      hour: getHourAndMinutes(new Date()),
      image: userReplier.image,
    };
    
    console.log("user data", user_id, user, newReply)

    const message = await messagesRepo.getById(messageId);
    message.replies = [...message.replies, newReply];

    console.log("message replies", message)

    const messageUpdated = await messagesRepo.updateById(messageId, message);
    console.log("message updated", messageUpdated)

    user.messages = user.messages.filter((message) => message.id != messageId);
    user.messages.push(messageUpdated);
    console.log("message pusheado", message)

    await UsersService.updateUserById(user_id, user); // creator of message
    return await messagesRepo.getAll();
  } catch (err) {
    throw new Error(err?.message);
  }
};

export default {
  createMessage,
  getMessages,
  getMessagesByUserId,
  getMessageById,
  addReplyToMessageById,
};
