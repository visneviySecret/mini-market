import axios from "~/utils/axios";

interface OrderItem {
  product_id: number;
  count: number;
  price: number;
}

export const createPaymentUrl = async (data: {
  orderId?: number;
  items?: OrderItem[];
}) => {
  const response = await axios.post("/payment/create", data);
  return response.data;
};
