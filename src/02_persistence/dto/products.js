class ProductDto {
    constructor({ _id, title, category, price, thumbnail, description, stock, in_cart }) {
      this.id = _id;
      this.title = title;
      this.category = category
      this.price = price;
      this.thumbnail = thumbnail;
      this.description = description;
      this.stock = stock;
      this.in_cart = in_cart;
    }
  }
  
  export default function productsFormatDTO(products) {
    if (Array.isArray(products)) {
      return products.map(obj => new ProductDto(obj));
    } else {
      return new ProductDto(products);
    }
  }