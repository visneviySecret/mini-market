<template>
  <div>
    <Button :onClick="makeOrder" :disabled="isCartEmpty">Оформить заказ</Button>
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
    ...mapGetters(["allCart", "isCartEmpty"]),
  },
  methods: {
    makeOrder() {
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
