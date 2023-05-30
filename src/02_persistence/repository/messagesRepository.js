import MessagesDaoFactory from "../dao/messages/MessagesDaoFactory.js"

class MessagesRepository {
  constructor() {
    this.dao = new MessagesDaoFactory().getDao()
  }

  async getAll() {
    return await this.dao.getAll()   
  }

  async getById(id){
    return this.dao.getById(id)
  }

  async getByEmail(email){
    return this.dato.getByEmail(email)
  }

  async save(obj) {
    return this.dao.save(obj)
  }

  async updateById(id,newObj) {
    return this.dao.updateById(id, newObj)
  }

  async deleteById(id) {
    return this.dao.deleteById(id)
  }
}

export default MessagesRepository