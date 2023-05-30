class MessagesDaoMemory {
    constructor() {
      this.messages = [];
      this.cont = 1;
    }
  
    init() {
      console.log("Messages dao in memory -> ready!");
    }
  
    disconnect() {
      console.log("Messages dao in memory -> closed!");
    }
  
    getIndex(id) {
      return this.messages.findIndex((message) => message.id == id);
    }
  
    async write(obj) {
      try {
        return this.messages.push(obj);
      } catch (err) {
        throw new Error(err?.message);;
      }
    }
  
    async save(obj) {
      const newMessage = { ...obj, id: this.cont++ }; 
      this.messages.push(newMessage);
      return newMessage;
    }
  
    async getById(id) { 
      try {
        return this.messages.find((item) => item.id == id);
      } catch (err) {
        throw new Error(err?.message);;
      }
    }
  
    async getAll() { 
      return this.messages;  
    }
  
    async deleteById(id) {
      try {
        const message = getById(id);
        const messages = getAll();
  
        if (!message) {
          return;
        }
  
        if (!messages) {
          return;
        }
  
        this.messages = messages.filter((obj) => obj.id !== message.id);
        return;
      } catch (err) {
        throw new Error(err?.message);
      }
    }
  
    async deleteAll() {
      try {
        return (this.messages = []);
      } catch (err) {
        throw new Error(err?.message);;
      }
    }
  
    async updateById(id, newObj) {
      try {
        const index = this.messages.findIndex((item) => item.id == id);
        this.messages = this.messages.filter((item) => item.id != id);
        newObj.id = parseInt(id);
        newObj.timestamp = Date.now();
        this.messages.splice(index, 0, newObj);
        return newObj;
      } catch (err) {
        throw new Error(err?.message);;
      }
    }
  }

  export default MessagesDaoMemory;
  