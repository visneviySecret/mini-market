<template>
  <div class="wrapper">
    <img :src="card.picture" />
    <span class="title">{{ card.model }}</span>
    <span class="sub-title">{{ card.subTitle }}</span>
    <span class="cost-range"
      >{{ getFormatNumber(card.minCost) }} ₽ –
      {{ getFormatNumber(card.maxCost) }} ₽ </span
    ><span class="cost-range__euro">77.60 € – 643.86 €</span>
    <Button :onClick="handleClick">Подробнее</Button>
  </div>
</template>

<script setup>
import Button from "@/UI/Button/index";
import Notifications from "@kyvg/vue3-notification";
import { getFormatNumber } from "@/utils/getFormatNumber";
const { card } = defineProps(["card"]);
const handleClick = () => {
  alert("Подробная информация будет позже");
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  max-width: 255px;
  padding: 25px;
  background: #f6f8fa;
  border-radius: 5px;
  color: #1f2432;
  margin-top: 100px;
}
img {
  min-height: 200px;
  margin-bottom: 5px;
}
.title {
  font-weight: 700;
  font-size: 22px;
  line-height: 120.52%;
  margin-bottom: 10px;
}
.sub-title {
  font-weight: 400;
  font-size: 14px;
  line-height: 145%;
  margin-bottom: 60px;
  min-height: 60px;
}
.cost-range {
  font-weight: 500;
  font-size: 22px;
  line-height: 130%;
  letter-spacing: 0.005em;
  margin-bottom: 3px;
}
.cost-range__euro {
  font-weight: 400;
  font-size: 16px;
  line-height: 145%;
  color: #797b86;
  margin-bottom: 30px;
}
</style>
