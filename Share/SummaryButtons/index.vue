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
      this.$router.push("/payment");
    },
  },
};
</script>

<style lang="scss" scoped>
div:first-child {
  margin-bottom: 12px;
}
</style>
