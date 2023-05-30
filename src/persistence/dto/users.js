class UserDto {
    constructor({ _id, password, email, username, address, phone, image, cart_id, messages}) {
      this.id = _id;
      this.password = password
      this.email = email;
      this.username = username;
      this.address = address;
      this.phone = phone;
      this.image = image;
      this.cart_id = cart_id;
      this.messages = messages;
    }
  }
  
  export default function usersFormatDTO(users) {
    if (Array.isArray(users)) {
      return carts.map(obj => new UserDto(obj));
    } else {
      return new UserDto(users);
    }
  }
