
import UsersDaoFactory from "../dao/users/UsersDaoFactory.js"
  
class UsersRepository {
    constructor() {
      this.dao = new UsersDaoFactory().getDao() 
    }
  
    async getAll(){
      return this.dao.getAll() 
    }
  
    async getById(id){
      return this.dao.getById(id)
    }
  
    async getByEmail(email){
      return this.dao.getByEmail(email) 
    }
    
    async getByUsername(username){
      return this.dao.getByUsername(username)
    }

    async save(obj){
      return this.dao.save(obj)
    }
  
    async updateById(id,newObj) { 
      return this.dao.updateById(id, newObj)
    }
  
    async deleteById(id){
      return this.dao.deleteById(id)
    }
  }
  
  export default  UsersRepository