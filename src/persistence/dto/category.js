class CategoryDto {
    constructor({ _id, name }) {
      this.id = _id;
      this.name = name
    }
  }
  
  export default function categoryFormatDTO(categories) {
    if (Array.isArray(categories)) {
      return categories.map(obj => new CategoryDto(obj));
    } else {
      return new CategoryDto(categories);
    }
  }