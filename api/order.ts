import apiClient from "~/utils/axios";

export async function createOrder(order: OrderRequest) {
  const response = await apiClient.post("/orders", order);
  return response.data;
}

export async function getOrder(orderId: number) {
  const response = await apiClient.get(`/orders/${orderId}`);
  return response.data;
}

export async function updateOrder(orderId: number, order: OrderRequest) {
  const response = await apiClient.put(`/orders/${orderId}`, order);
  return response.data;
}

export async function deleteOrder(orderId: number) {
  const response = await apiClient.delete(`/orders/${orderId}`);
  return response.data;
}
