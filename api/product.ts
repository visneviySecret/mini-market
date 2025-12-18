import apiClient from "~/utils/axios";

async function getProducts(): Promise<Product[]> {
  const response = await apiClient.get("/products");
  return response.data;
}

async function createProduct(payload: CreateProductPayload) {
  const response = await apiClient.post("/products/create", payload);
  return response.data;
}

export { getProducts, createProduct };
