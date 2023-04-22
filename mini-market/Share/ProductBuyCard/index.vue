<template>
  <div class="wrapper">
    <nuxt-img :src="product.picture" :alt="product.title" />
    <div class="content">
      <h3 class="content__title">{{ product.title }}</h3>
      <p class="content__specs">
        {{ product.specs }}
      </p>
      <p class="content__article">Артикул: {{ product.article }}</p>
    </div>
    <ControlButtons
      :count="count"
      :cost="product.cost"
      :handleIncrement="handleIncrement"
      :handleDecrement="handleDecrement"
    />
    <span class="cost">{{ product.cost * count }} ₽</span>
    <div class="cross-wrapper" @click="removeProductById(product.id)">
      <CrossIcon />
    </div>
  </div>
</template>

<script>
import CrossIcon from "@/UI/CrossIcon/index";
import ControlButtons from "@/Share/ControlButtons/index";
import { mapActions } from "vuex";

export default {
  props: ["product", "count"],
  methods: {
    ...mapActions([
      "removeProductById",
      "incrementCounter",
      "decrementCounter",
    ]),
    handleIncrement() {
      this.incrementCounter(this.product.id);
    },
    handleDecrement() {
      this.decrementCounter(this.product.id);
    },
  },
  computed() {},
  components: {
    CrossIcon,
    ControlButtons,
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 15px;
  max-height: 121px;
  margin-top: 25px;
}
img {
  width: 100px;
  height: 100px;
}
.content__specs {
  max-width: 282px;
  font-size: 12px;
  line-height: 150%;
  color: #2c3242;
  margin-block: 6px;
}
.content__article {
  font-size: 14px;
  line-height: 150%;
  color: #797b86;
}
.cost {
  width: 120px;
  font-family: "Roboto";
  font-weight: 500;
  font-size: 18px;
  line-height: 145%;
  text-align: left;
  color: #1f2432;
}
.cross-wrapper {
  position: absolute;
  top: 27px;
  right: 6px;
}
</style>
