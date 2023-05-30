const socket = io(); 

const loadMessages = (callback) => { 
  socket.on("messages", callback);
};

export { loadMessages };
