interface Order {
  id: number;
  address_id: number;
  status: string;
  total_price: number;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

type OrderRequest = Pick<Order, "items">;

interface OrderItem {
  count: number;
  price: number;
}

interface OrderItem {
  product_id: number;
  count: number;
  price: number;
}
