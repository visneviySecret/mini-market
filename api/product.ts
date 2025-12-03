async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const message = (data && data.message) || "Ошибка получения продуктов";
    throw new Error(message);
  }
  return response.json();
}

export { getProducts };
