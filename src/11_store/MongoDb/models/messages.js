import mongoose from 'mongoose';

const ReplySchema = new mongoose.Schema({
  user_id: { type: String, require: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  hour: { type: String, required: true },
  image: { type: String, required: true },
});

const messagesSchema = new mongoose.Schema({  
  user_id: { type: String, require: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  hour: { type: String, required: true },
  image: { type: String, required: true },
  replies: { type: [ReplySchema], default: [] },
});

export {messagesSchema}