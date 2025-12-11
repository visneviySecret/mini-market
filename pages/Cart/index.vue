<template>
  <div>
    <div class="wrapper">
      <div class="content">
        <header>
          <h1>Ваша корзина</h1>
          <span class="cart-counter"
            >{{ cartStats.count }} товар{{ ending }}</span
          >
          <span class="clear-cart" @click="clearCart()">Очистить корзину</span>
        </header>
        <div class="product-list">
          <TransitionGroup name="fade" tag="ul" class="container">
            <li v-for="product in allCart" :key="product.product.id">
              <ProductBuyCard
                :product="product.product"
                :count="product.count"
              />
            </li>
          </TransitionGroup>
        </div>
      </div>
      <div class="aside">
        <BuySummary />
      </div>
    </div>
    <ViewedProducts />
  </div>
</template>

<script>
import ProductBuyCard from "@/Share/ProductBuyCard/index";
import { mapGetters, mapActions } from "vuex";
import { getEnding } from "@/utils/getEnding";

export default {
  methods: {
    ...mapActions(["clearCart"]),
  },
  computed: {
    ...mapGetters(["allCart", "cartStats"]),
    ending() {
      return getEnding(this.cartStats.count);
    },
  },
  components: {
    ProductBuyCard,
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  gap: min(3vw, 55px);
  justify-content: space-between;
}
.content {
  flex: 3;
  margin-bottom: 95px;
  max-width: 800px;
}
.aside {
  flex: 1;
  margin-top: 100px;
}
header {
  display: flex;
  align-items: baseline;
  margin-bottom: 25px;
}
.product-list {
  min-height: 436px;
}
.cart-counter {
  margin-left: 22px;
  font-size: 18px;
  color: #797b86;
}
.clear-cart {
  margin-left: auto;
  font-size: 14px;
  text-decoration-line: underline;
  color: #797b86;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
}
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-200px);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>
