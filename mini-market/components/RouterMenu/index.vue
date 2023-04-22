<template>
  <div>
    <nuxt-link to="/" class="home">Главная</nuxt-link>
    <img src="~/assets/icons/navArrow.svg" />
    <nuxt-link to="/cart">Корзина</nuxt-link>
  </div>
</template>

<script setup>
const route = useRouter();
const mock_route = "/cart/item";

const arr = mock_route.split("/");
</script>

<style lang="scss" scoped>
div {
  display: flex;
  gap: 10px;
}
a {
  text-decoration: none;
  color: #797b86;
  &:hover {
    opacity: 0.7;
  }
}

.home {
  color: #33374e;
}
</style>
