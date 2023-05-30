class CartDto {
    constructor({ _id, email, products, delivery_address, total }) {
      this.id = _id;
      this.email = email;
      this.products = products;
      this.delivery_address= delivery_address;
      this.total = total;

    }
  }
  
  export default function cartFormatDTO(carts) {
    if (Array.isArray(carts)) {
      return carts.map(obj => new CartDto(obj));
    } else {
      return new CartDto(carts);
    }
  }
