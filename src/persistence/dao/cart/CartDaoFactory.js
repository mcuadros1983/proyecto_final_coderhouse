import config from "../../../config/config.js"
import CartDaoMemory from './CartDaoMemory.js'
import CartDaoMongoDb from './CartDaoMongoDb.js'

const option = config.PERSISTENCE_SYSTEM
let dao

switch (option) {
  case 'mongo':
    dao = new CartDaoMongoDb()
    dao.init()
    break
  case 'memory':
    dao = new CartDaoMemory()
    dao.init()
    break
  default:
    dao = new CartDaoMemory()
    dao.init()
}

export default class CartDaoFactory {
  static instance

  constructor() {
    if (!CartDaoFactory.instance) {
        CartDaoFactory.instance = this
    } else {
      return CartDaoFactory.instance
    }
  }

  getDao() {
    return dao
  }
}