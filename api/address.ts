import apiClient from "~/utils/axios";

export async function getAddresses() {
  const response = await apiClient.get("/addresses");
  return response.data;
}

export async function createAddress(payload: {
  user_id: number;
  city: string;
  street: string;
  index: string;
  phone: string;
}) {
  const response = await apiClient.post("/addresses", payload);
  return response.data;
}

export async function updateAddress(
  id: string,
  payload: {
    city: string;
    street: string;
    index: string;
    phone: string;
  }
) {
  const response = await apiClient.put(`/addresses/${id}`, payload);
  return response.data;
}

export async function deleteAddress(id: string) {
  const response = await apiClient.delete(`/addresses/${id}`);
  return response.data;
}
