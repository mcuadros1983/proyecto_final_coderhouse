
import cartRepository from "../02_persistence/repository/cartRepository.js";
import ProductsService from "./productsService.js";


const cartRepo = new cartRepository();


const createCart = async (cart) => {

  try {
    return await cartRepo.save(cart);
  } catch (err) {
    throw new Error(err?.message);
  }
};

const getCarts = async () => {
  try {
    return await cartRepo.getAll();
  } catch (err) {
    throw new Error(err?.message);
  }
};

const getCartById = async (id) => {
  try {
    const cart = await cartRepo.getById(id);

    return cart;
  } catch (err) {
    throw new Error(err?.message);
  }

};



const addProductToCart = async (cart_id, product) => {
  try {
    console.log("Punto1")
    let { products, total } = await cartRepo.getById(cart_id);

    
    const productInCart = products.find((item) => {
      return item._id == product.id || item.id == product.id;
    });
    total = total + product.price;
    if (!productInCart) {
      const newProduct = { ...product, in_cart: 1 };

      return await cartRepo.addProductToCart(cart_id, newProduct, total);
    } else {
      const newProduct = { ...product, in_cart: productInCart.in_cart + 1 };

      return await cartRepo.addProductToCart(cart_id, newProduct, total); 
    }
  } catch (err) {
    throw new Error(err?.message);
  }
};


const deleteProductFromCart = async (cartId, productId) => {
  try {

    return await cartRepo.deleteProductFromCart(cartId, productId);
  } catch (err) {
    throw new Error(err?.message);
  }
};


const deleteCartById = async (id) => {
  try {

    console.log("dcart2", id)
    let idDeleteCart = await cartRepo.deleteById(id);


    return idDeleteCart;
  } catch (err) {
    throw new Error(err?.message);
  }
};

export default {
  createCart,
  getCarts,
  getCartById,
  addProductToCart,
  deleteProductFromCart,
  deleteCartById,
};
