class CategoryDaoMemory {
    constructor() {
      this.category = [];
      this.cont = 1;
    }
  
    init() {
      console.log("Category dao in memory -> ready!");
    }
  
    disconnect() {
      console.log("Category dao in memory -> closed!");
    }
  
    getIndex(id) {
      return this.category.findIndex((category) => category.id == id);
    }
  
    async write(datos) {
      try {
        return this.category.push(datos);
      } catch (err) {
        throw new Error(err?.message);;
      }
    }
  
    async save(obj) {
      const newCategory = { ...obj, id: this.cont++ };
      this.category.push(newCategory);
      return newCategory;
    }
  
    async getById(id) {
      try {
        return this.category.find((item) => item.id == id);
      } catch (err) {
        throw new Error(err?.message);
      }
    }
    
    async getByName(category_name){
      try {
        return this.category.find((category) => category.name == category_name);;
      } catch (err) {
        throw new Error(err?.message);
      }
    }

    async getAll() {
      return this.category;
    }
  
    async deleteById(id) {
      try {
        const category = getById(id);
        const categories = getAll();
  
        if (!category) {
          return;
        }
  
        if (!categories) {
          return;
        }
  
        this.categories = categories.filter((obj) => obj.id !== category.id);
        return;
      } catch (err) {
        throw new Error(err?.message);
      }
    }
  
    async deleteAll() {
      try {
        return (this.category = []);
      } catch (err) {
        throw new Error(err?.message);;
      }
    }
  
    async updateById(id, newObj) {
      try {
        const index = this.category.findIndex((item) => item.id == id);
        this.category = this.category.filter((item) => item.id != id);
        newObj.id = parseInt(id);
        newObj.timestamp = Date.now();
        this.category.splice(index, 0, newObj);
        return newObj;
      } catch (err) {
        throw new Error(err?.message);;
      }
    }
  }

  export default CategoryDaoMemory;
  