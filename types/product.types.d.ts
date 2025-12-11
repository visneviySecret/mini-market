interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
}

interface CreateProductPayload extends Omit<Product, "id" | "photo"> {
  photo: Blob;
}
