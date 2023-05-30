class ProductsDaoMemory {
  constructor() {
    this.products = [];
    this.cont = 1;
  }

  init() {
    console.log("Products dao in memory -> ready!");
  }

  disconnect() {
    console.log("Products dao in memory -> closed!");
  }

  getIndex(id) {
    return this.products.findIndex((product) => product.id == id);
  }

  async write(datos) {
    try {
      return this.products.push(datos);
    } catch (err) {
      throw new Error(err?.message);;
    }
  }

  async save(obj) {
    const newProduct = { ...obj, id: this.cont++ };
    this.products.push(newProduct);
    return newProduct;
  }

  async getById(id) {
    try {
      return this.products.find((item) => item.id == id);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getByCategory(category) {
    try {
      return this.products.filter((product) => product.category == category);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getAll() {
    return this.products;
  }

  async deleteById(id) {
    try {
      const product = getById(id);
      const products = getAll();

      if (!product) {
        return;
      }

      if (!products) {
        return;
      }

      this.products = products.filter((obj) => obj.id !== product.id);
      return;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteAll() {
    try {
      return (this.products = []);
    } catch (err) {
      throw new Error(err?.message);;
    }
  }

  async updateById(id, newObj) {
    try {
      const index = this.products.findIndex((item) => item.id == id);
      this.products = this.products.filter((item) => item.id != id);
      newObj.id = parseInt(id);
      newObj.timestamp = Date.now();
      this.products.splice(index, 0, newObj);
      return newObj;
    } catch (err) {
      throw new Error(err?.message);;
    }
  }
}

export default ProductsDaoMemory;
