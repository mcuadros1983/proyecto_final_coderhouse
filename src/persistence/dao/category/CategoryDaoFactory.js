import config from "../../../config/config.js"
import CategoryDaoMemory from "./CategoryDaoMemory.js"
import CategoryDaoMongoDb from './CategoryDaoMongoDb.js'

const option = config.PERSISTENCE_SYSTEM
let dao

switch (option) {
  case 'mongo':
    dao = new CategoryDaoMongoDb()
    dao.init()
    break
  case 'memory':
    dao = new CategoryDaoMemory()
    dao.init()
    break
  default:
    dao = new CategoryDaoMemory()
    dao.init()
}

export default class CategoryDaoFactory {
  static instance

  constructor() {
    if (!CategoryDaoFactory.instance) {
        CategoryDaoFactory.instance = this
    } else {
      return CategoryDaoFactory.instance
    }
  }

  getDao() {
    return dao
  }
}