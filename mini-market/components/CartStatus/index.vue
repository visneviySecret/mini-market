<template>
  <div class="wrapper">
    <img src="~/assets/icons/cart.svg" style="width: 32px; height: 32px" />
    <div class="cart-stats">
      <span class="title">Ваша корзина</span>
      <span class="products">{{ cartStats.count }} товара</span>
      <span class="cost">{{ cartStats.cost }} ₽</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["cartStats"]),
  },
};
</script>

<style lang="scss" scoped>
div {
  display: flex;
}
.wrapper {
  gap: 12px;
  height: 90px;
  font-weight: 400;
  margin-left: auto;
  align-items: center;

  .title {
    font-size: 14px;
  }

  .products,
  .cost {
    font-size: 12px;
    line-height: 145%;
  }
  .products {
    margin-top: -2px;
    color: #797b86;
  }
  .cost {
    margin-top: -1px;
  }

  .cart-stats {
    flex-direction: column;
  }
}
</style>
