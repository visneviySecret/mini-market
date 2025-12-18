interface Product {
  description: string;
  id: number;
  images: string[];
  name: string;
  preview: string;
  price: number;
}

interface CreateProductPayload extends Omit<Product, "id" | "photo"> {
  images: Blob[];
}
