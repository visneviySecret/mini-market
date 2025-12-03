<template>
  <div>
    <nuxt-link to="/" class="home">Главная</nuxt-link>
    <div v-if="routeName === '/cart'">
      <img src="~/assets/icons/navArrow.svg" />
      <nuxt-link to="/cart">Корзина</nuxt-link>
    </div>
    <div v-if="routeName === '/settings'">
      <img src="~/assets/icons/navArrow.svg" />
      <nuxt-link to="/settings">Настройки</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    routeName() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  display: flex;
  gap: 10px;
}
a {
  text-decoration: none;
}
.router-link-exact-active {
  color: #797b86;
  &:hover {
    opacity: 0.7;
  }
}

.home {
  color: #33374e;
}
</style>
