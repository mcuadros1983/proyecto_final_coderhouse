import config from "../../../13_config/config.js"
import OrderDaoMemory from './OrderDaoMemory.js'
import OrderDaoMongoDb from './OrderDaoMongoDb.js'

const option = config.PERSISTENCE_SYSTEM
let dao

switch (option) {
  case 'mongo':
    dao = new OrderDaoMongoDb()
    dao.init()
    break
  case 'memory':
    dao = new OrderDaoMemory()
    dao.init()
    break
  default:
    dao = new OrderDaoMemory()
    dao.init()
}

export default class OrderDaoFactory {
  static instance

  constructor() {
    if (!OrderDaoFactory.instance) {
        OrderDaoFactory.instance = this
    } else {
      return OrderDaoFactory.instance
    }
  }

  getDao() {
    return dao
  }
}