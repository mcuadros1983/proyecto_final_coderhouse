
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
      const carts = this.cart
      console.log("dcart3", cart, carts)
      if (!cart) {
        return;
      }

      if (!carts) {
        return;
      }

      cart.products = []
      cart.total = 0
      this.cart = this.cart.filter((obj) => obj.id !== cart.id);
      this.cart.push(cart)
      console.log("dcart4", this.cart, cart.id)
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
      console.log("test2", cart_id, product, total);
      const cart = await this.cart.find((item) => item.id == cart_id);
      const carts = this.cart

      if (!cart) {
        return;
      }

      if (!carts) {
        return;
      }

      //borramos el carrito
      this.cart = this.cart.filter((item) => item.id != cart.id);

      //modificamos el total
      cart.total = total;
      product.timestamp = Date.now();

      console.log("product in cart", product.in_cart) 
      if (product.in_cart == 1) {

        //agregamos el producto al carrito
        cart.products.push(product);

        //agregamos el carrito a la base
        this.cart.push(cart);
        this.cart.sort((a, b) => a.id - b.id);

        return product;
      } else {
        //borramos el producto del carrito
        const product_incart = cart.products.find(
          (item) => item.title == product.title
        );
        console.log("data1", product_incart) 

        product.id = product_incart.id;
        console.log("data2", product)

        cart.products = cart.products.filter((item) => item.title != product.title);
        console.log("data3", cart)

        cart.products.push(product);
        console.log("data4", cart)

        //agregamos el carrito a la base
        this.cart.push(cart);
        this.cart.sort((a, b) => a.id - b.id);
        console.log("data5", this.cart)

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

      let product = cart.products.find((item) => item.id == product_id)
      this.cart = this.cart.filter((item) => item.id != cart_id);
      console.log("delete1")

      if (product === undefined) {
        return;
      } else {
        console.log("delete2")
        cart.products = cart.products.filter((item) => item.id != product_id);
        cart.total = cart.total - (product.price * product.in_cart)
        this.cart.push(cart);
        this.cart.sort((a, b) => a.id - b.id);
        console.log("delete3")
        return;
      }
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}


export default CartDaoMemory;
