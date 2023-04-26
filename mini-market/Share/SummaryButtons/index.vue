<template>
  <div>
    <Button :onClick="makeOrder">Оформить заказ</Button>
    <Button :onClick="oneClickOrder" theme="outlined">Купить в 1 клик</Button>
  </div>
</template>

<script>
import Button from "@/UI/Button/index";
import { mapGetters } from "vuex";
export default {
  components: {
    Button,
  },
  computed: {
    ...mapGetters(["allCart"]),
  },
  methods: {
    makeOrder() {
      alert("Оформление ещё не работает, попробуйте купить в один клик");
    },
    oneClickOrder() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.allCart),
      };
      try {
        fetch("https://testapi.jasonwatmore.com/products", requestOptions)
          .then((response) => response.json())
          .then((data) => (product.value = data));
      } catch {
        throw new Error("Api ещё не работает");
      } finally {
        alert(
          "Ваша корзина была отправлена на тестовый сервер. Спасибо за заказ!"
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
div:first-child {
  margin-bottom: 12px;
}
</style>
