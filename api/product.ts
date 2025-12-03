import apiClient from "~/utils/axios";

async function getProducts(): Promise<Product[]> {
  const response = await apiClient.get("/products");
  return response.data;
}

export { getProducts };
