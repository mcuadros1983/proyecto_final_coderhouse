import { errorCodes } from "../middleware/errors/errorDictionary.js";
import MessagesRepository from "../persistence/repository/messagesRepository.js";
import UsersService from "./usersService.js";
import { getHourAndMinutes } from "../utils/index.js";

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

const getMessages = async () => {
  try {
    return await messagesRepo.getAll();
  } catch (err) {
    throw new Error(err?.message);
  }
};

const getMessagesByUserId = async (userId) => {
  try {
    const user = await UsersService.getUserById(userId);
    return user.messages;
  } catch (err) {
    throw new Error(err?.message);
  }
};

const getMessageById = async (id) => {
  try {
    const message = await messagesRepo.getById(id);
    return message;
  } catch (err) {
    throw new Error(err?.message);
  }
};

const addReplyToMessageById = async (messageId, body, userReplierId) => {
  try {
    const userReplier = await UsersService.getUserById(userReplierId); // replier
    const { user_id } = await getMessageById(messageId);
    const user = await UsersService.getUserById(user_id);

    const newReply = {
      user_id: userReplierId, // replier
      email: userReplier.email, // replier
      message: body.message,
      hour: getHourAndMinutes(new Date()),
      image: userReplier.image,
    };

    const message = await messagesRepo.getById(messageId);
    message.replies = [...message.replies, newReply];

    const messageUpdated = await messagesRepo.updateById(messageId, message);

    user.messages = user.messages.filter((message) => message.id != messageId);
    user.messages.push(messageUpdated);

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
