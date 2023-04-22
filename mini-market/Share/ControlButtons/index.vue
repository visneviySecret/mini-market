<template>
  <div>
    <button class="left" @click="handleDecrement">-</button>
    <button>{{ count }}</button>
    <button class="right" @click="handleIncrement">+</button>
    <span class="cost" v-if="count > 1">{{ cost }} ₽/шт.</span>
  </div>
</template>

<script>
export default {
  props: ["count", "handleIncrement", "handleDecrement", "cost"],
};
</script>

<style lang="scss" scoped>
div {
  position: relative;
  display: flex;
  gap: 2px;
}

button {
  min-width: 34px;
  min-height: 34px;
  background: #f6f8fa;
  padding: 7px 11px;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  color: #1f2432;
  &.left {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  &.right {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
.cost {
  position: absolute;
  bottom: -23px;
  left: 25%;
  font-family: "Roboto";
  font-weight: 400;
  font-size: 12px;
  line-height: 145%;
  color: #1f2432;
}
</style>
