interface User {
  id: string;
  email: string;
  addresses: Address[];
}

interface Address {
  id: string;
  city: string;
  street: string;
  index: string;
  phone: string;
}
