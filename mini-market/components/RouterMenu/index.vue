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
// console.log(route.currentRoute._value.fullPath);

const arr = mock_route.split("/");

// const formattedArr = arrayFormatter(arr);

// const arrayFormatter = (arr) => {
//   return arr.reduce((acc, val) => {
//     acc[val] === "cart" && "Корзина";
//     return acc;
//   }, {});
// };
console.log(arr);
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
