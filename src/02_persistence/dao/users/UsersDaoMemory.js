class UsersDaoMemory {
  constructor() {
    this.users = [];
    this.cont = 1;
  }

  init() {
    console.log("Users dao in memory -> ready!");
  }

  disconnect() {
    console.log("Users dao in memory -> closed!");
  }

  getIndex(id) {
    return this.users.findIndex((user) => user.id == id);
  }

  async write(datos) {
    try {
      return this.users.push(datos);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async save(obj) {
    const newUser = { ...obj, id: this.cont++ };
    this.users.push(newUser);
    return newUser;
  }

  async getById(id) {
    try {
      return this.users.find((item) => item.id == id);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getByEmail(email) {
    try {

      return this.users.find((user) => user.email == email);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getByUsername(username) {
    try {
      return this.users.find((user) => user.username == username);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getAll() {
    return this.users; 
  }

  async deleteById(id) {
    try {
      const user = getById(id);
      const users = getAll();

      if (!user) {
        return;
      }

      if (!users) {
        return;
      }

      this.users = users.filter((obj) => obj.id !== user.id);
      return;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteAll() {
    try {
      return (this.users = []);
    } catch (err) {
      throw new Error(err?.message);;
    }
  }

  async updateById(id, newObj) { 
    try {
      const index = this.users.findIndex((item) => item.id == id);
      this.users = this.users.filter((item) => item.id != id);
      console.log("users", this.users)
      newObj.id = parseInt(id);
      newObj.timestamp = Date.now();
      console.log("newobject", newObj)
      this.users.splice(index, 0, newObj);
      return newObj;

    } catch (err) {
      throw new Error(err?.message);;
    }
  }
}

export default UsersDaoMemory;
