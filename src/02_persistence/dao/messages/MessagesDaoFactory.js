import config from "../../../13_config/config.js"
import MessagesDaoMemory from './MessagesDaoMemory.js'
import MessagesDaoMongoDb from './MessagesDaoMongoDb.js'

const option = config.PERSISTENCE_SYSTEM
let dao

switch (option) {
  case 'mongo':
    dao = new MessagesDaoMongoDb()
    dao.init()
    break
  case 'memory':
    dao = new MessagesDaoMemory()
    dao.init()
    break
  default:
    dao = new MessagesDaoMemory()
    dao.init()
}

export default class MessagesDaoFactory {
  static instance

  constructor() {
    if (!MessagesDaoFactory.instance) {
        MessagesDaoFactory.instance = this
    } else {
      return MessagesDaoFactory.instance
    }
  }

  getDao() {
    return dao
  }
}