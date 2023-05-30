import config from "../../../config/config.js"
import ProductsDaoMemory from "./ProductsDaoMemory.js"
import ProductsDaoMongoDb from './ProductsDaoMongoDb.js'

const option = config.PERSISTENCE_SYSTEM
let dao

switch (option) {
  case 'mongo':
    dao = new ProductsDaoMongoDb()
    dao.init()
    break
  case 'memory':
    dao = new ProductsDaoMemory()
    dao.init()
    break
  default:
    dao = new ProductsDaoMemory()
    dao.init()
}

export default class ProductsDaoFactory {
  static instance

  constructor() {
    if (!ProductsDaoFactory.instance) {
        ProductsDaoFactory.instance = this
    } else {
      return ProductsDaoFactory.instance
    }
  }

  getDao() {
    return dao
  }
}