export const LOCAL_CART = "cart";

export const loadCartFromLocalStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const cartData = window.localStorage.getItem(LOCAL_CART);
  if (!cartData) {
    return null;
  }

  try {
    return JSON.parse(cartData);
  } catch (error) {
    console.error("Ошибка парсинга корзины из localStorage:", error);
    return null;
  }
};

export const saveCartToLocalStorage = (products: unknown) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LOCAL_CART, JSON.stringify(products));
};

