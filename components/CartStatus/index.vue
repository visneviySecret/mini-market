<template>
  <div class="wrapper">
    <nuxt-link to="/cart">
      <img src="~/assets/icons/cart.svg" style="width: 32px; height: 32px" />
    </nuxt-link>
    <div class="cart-stats">
      <span class="title">Ваша корзина</span>
      <span class="products">{{ cartStats.count }} товар{{ ending }}</span>
      <span class="cost">{{ getFormatNumber(cartStats.cost) }} ₽</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getEnding } from "@/utils/getEnding";
import { getFormatNumber } from "@/utils/getFormatNumber";

export default {
  computed: {
    ...mapGetters(["cartStats"]),
    ending() {
      return getEnding(this.cartStats.count);
    },
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
