<template>
  <div>
    <CarouselButton />
    <div class="counter">
      <span class="counter__count">1</span
      ><span class="counter__total-pages">/ 6</span>
    </div>
    <CarouselButton class="right" />
  </div>
</template>

<script setup>
import CarouselButton from "@/UI/CarouselButton/index";
</script>

<style lang="scss" scoped>
div {
  display: flex;
  align-items: center;
}
.counter {
  display: inline-block;
  margin-inline: 20px 15px;
  .counter__count {
    font-size: 24px;
    line-height: 150%;
    color: #212121;
    margin-right: 5px;
  }
  .counter__total-pages {
    font-weight: 400;
    font-size: 18px;
    line-height: 145%;
    color: #797b86;
  }
}
.right {
  rotate: 180deg;
}
</style>
