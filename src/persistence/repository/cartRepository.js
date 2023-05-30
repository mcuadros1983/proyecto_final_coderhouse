import CartDaoFactory from "../dao/cart/CartDaoFactory.js"

class CartRepository {
  constructor() {
    this.dao = new CartDaoFactory().getDao() 
  }

  async getAll() {
    return this.dao.getAll()
  }

  async getById(id){ 
    return this.dao.getById(id)
  }

  async save(obj) {
    return this.dao.save(obj)
  }

  async updateById(id,newObj) {
    return this.dao.updateById(id, newObj)
  }

  async addProductToCart(id,newObj, total) {
    return this.dao.addProductToCart(id, newObj, total) 
  }

  async deleteById(id) {
    return this.dao.deleteById(id)
  }

  async deleteProductFromCart(cartId, porductId) {
    return this.dao.deleteProductFromCart(cartId,porductId)
  }
}

export default CartRepository