import CategoryDaoFactory from "../dao/category/CategoryDaoFactory.js"

class CategoryRepository {
  constructor() {
    this.dao = new CategoryDaoFactory().getDao() 
  }

  async getAll() { 
    return this.dao.getAll()
  }

  async getById(id){
    return this.dao.getById(id)
  }

  async getByName(category_name){
    return this.dao.getByName(category_name)
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

export default CategoryRepository