import OrderDaoFactory from "../dao/order/OrderDaoFactory.js"

class OrderRepository {
  constructor() {
    this.dao = new OrderDaoFactory().getDao()
  }

  async getAll() {
    return this.dao.getAll()
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

export default OrderRepository