class CartDaoMemory {
  constructor() {
    this.cart = [];
    this.cont = 1;
  }

  init() {
    console.log("Cart dao in memory -> ready!");
  }

  disconnect() {
    console.log("Cart dao in memory -> closed!");
  }

  getIndex(id) {
    return this.cart.findIndex((cart) => cart.id == id);
  }

  async write(obj) {
    try {
      return this.cart.push(obj);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async save(obj) {
    const newCart = { ...obj, id: this.cont++ };
    this.cart.push(newCart);
    return newCart;
  }

  async getById(id) {
    try {
      return await this.cart.find((item) => item.id == id);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getAll() {
    return this.cart;
  }

  async deleteById(id) {
    try {
      const cart = await this.cart.find((item) => item.id == id);
      const carts = this.cart;
      if (!cart) {
        return;
      }

      if (!carts) {
        return;
      }

      cart.products = [];
      cart.total = 0;
      this.cart = this.cart.filter((obj) => obj.id !== cart.id);
      this.cart.push(cart);
      return cart.id;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteAll() {
    try {
      return (this.cart = []);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async updateById(id, newObj) {
    try {
      const index = this.cart.findIndex((item) => item.id == id);
      this.cart = this.cart.filter((item) => item.id != id);
      newObj.id = parseInt(id);
      newObj.timestamp = Date.now();
      this.cart.splice(index, 0, newObj);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async addProductToCart(cart_id, product, total) {
    try {
      const cart = await this.cart.find((item) => item.id == cart_id);
      const carts = this.cart;

      if (!cart) {
        return;
      }

      if (!carts) {
        return;
      }

      this.cart = this.cart.filter((item) => item.id != cart.id);

      cart.total = total;
      product.timestamp = Date.now();

      if (product.in_cart == 1) {
        cart.products.push(product);
        this.cart.push(cart);
        this.cart.sort((a, b) => a.id - b.id);

        return product;
      } else {
        const product_incart = cart.products.find(
          (item) => item.title == product.title
        );
        product.id = product_incart.id;
        cart.products = cart.products.filter(
          (item) => item.title != product.title
        );
        cart.products.push(product);
        this.cart.push(cart);
        this.cart.sort((a, b) => a.id - b.id);

        return product;
      }
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteProductFromCart(cart_id, product_id) {
    try {
      let cart = await this.getById(cart_id);
      let carts = await this.getAll();

      if (!cart) {
        return;
      }

      if (!carts) {
        return;
      }

      let product = cart.products.find((item) => item.id == product_id);
      this.cart = this.cart.filter((item) => item.id != cart_id);

      if (product === undefined) {
        return;
      } else {
        cart.products = cart.products.filter((item) => item.id != product_id);
        cart.total = cart.total - product.price * product.in_cart;
        this.cart.push(cart);
        this.cart.sort((a, b) => a.id - b.id);
        return;
      }
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default CartDaoMemory;
