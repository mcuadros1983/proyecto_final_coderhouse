import ProductsDaoFactory from "../dao/products/ProductsDaoFactory.js"

class ProductsRepository {
  constructor() {
    this.dao = new ProductsDaoFactory().getDao()
  }

  async getAll() {
    return this.dao.getAll()
  }

  async getById(id){
    return this.dao.getById(id) 
  }

  async getByCategory(category){
    return this.dao.getByCategory(category)
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

export default ProductsRepository