class OrderDto {
  constructor({ _id, products, state, buyer_email, purchase_date, total }) {
    this.id = _id;
    this.products = products;
    this.state = state;
    this.buyer_email = buyer_email;
    this.purchase_date = purchase_date;
    this.total = total;
  }
}

export default function orderFormatDTO(orders) {
  if (Array.isArray(orders)) {
    return orders.map((obj) => new OrderDto(obj));
  } else {
    return new OrderDto(orders);
  }
}
