import apiClient from "~/utils/axios";

export async function createOrder(order: OrderRequest) {
  const response = await apiClient.post("/order", order);
  return response.data;
}

export async function getMyOrder() {
  const response = await apiClient.get(`/order`);
  return response.data;
}

export async function updateOrder(orderId: number, order: OrderRequest) {
  const response = await apiClient.put(`/order/${orderId}`, order);
  return response.data;
}

export async function deleteOrder() {
  const response = await apiClient.delete(`/order/`);
  return response.data;
}
