class MessagesDto {
    constructor({ _id, user_id, email, message, hour, image, replies }) {
        this.id = _id
        this.user_id = user_id,
        this.email =  email,
        this.message = message,
        this.hour = hour,
        this.image = image,
        this.replies = replies
    }
  }
  
  export default function messagesFormatDTO(messages) {
    if (Array.isArray(messages)) {
      return messages.map(obj => new MessagesDto(obj));
    } else {
      return new MessagesDto(messages);
    }
  }
