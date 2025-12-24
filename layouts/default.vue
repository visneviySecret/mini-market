<template>
  <div class="container">
    <header>
      <NavBar />
      <RouterMenu />
    </header>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { getUserMe } from "~/api/user";
import { getMyOrder } from "~/api/order";
import { useStore } from "vuex";
import { loadCartFromLocalStorage } from "~/utils/cartLocalStorage";

const store = useStore();
const auth = useCookie(import.meta.env.VITE_REFRESH_TOKEN);

onMounted(async () => {
  if (auth.value && !store.getters.user?.id) {
    await loadUserOrderFromServer();
  } else if (!auth.value) {
    await loadUserOrderFromLocalStorage();
  }
});
const loadUserOrderFromServer = async () => {
  try {
    const userData = await getUserMe();
    store.dispatch("setUser", userData);

    const userOrder = await getMyOrder();
    userOrder?.items.forEach((item) => {
      store.commit("addProductToCart", item);
    });
    if (userOrder) {
      store.commit("setOrderId", userOrder.id);
    }
  } catch (error) {
    console.error("Ошибка загрузки пользователя:", error);
  } finally {
    store.commit("setCartStatus", "loaded");
  }
};

const loadUserOrderFromLocalStorage = async () => {
  const savedCart = loadCartFromLocalStorage();
  if (savedCart && savedCart.length > 0) {
    store.commit("updateCart", savedCart);
  }
  store.commit("setCartStatus", "loaded");
};
</script>

<style lang="scss" scoped>
.container {
  max-width: min(95%, 1280px);
  margin-inline: auto;
  margin-bottom: 115px;
  color: #1f2432;
}
header {
  margin-bottom: 50px;
}
</style>
