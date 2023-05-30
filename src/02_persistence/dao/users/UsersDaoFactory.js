import config from '../../../13_config/config.js'
import UsersDaoMemory from "./UsersDaoMemory.js"
import UsersDaoMongoDb from './UsersDaoMongoDb.js'

const option = config.PERSISTENCE_SYSTEM
let dao

switch (option) {
  case 'mongo':
    dao = new UsersDaoMongoDb()
    dao.init()
    break
  case 'memory':
    dao = new UsersDaoMemory()
    dao.init()
    break
  default:
    dao = new UsersDaoMemory()
    dao.init()
}

export default class UsersDaoFactory {
  static instance

  constructor() {
    if (!UsersDaoFactory.instance) {
        UsersDaoFactory.instance = this
    } else {
      return UsersDaoFactory.instance
    }
  }

  getDao() {
    return dao
  }
}