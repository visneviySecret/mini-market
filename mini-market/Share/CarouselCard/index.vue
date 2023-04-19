<template>
  <div class="wrapper">
    <img src="~/assets/images/img1.png" />
    <span class="title">BXC</span>
    <span class="sub-title"
      >Вытяжное устройство для механической системы вентиляции</span
    >
    <span class="cost-range">6 848 ₽ – 56 584 ₽ </span
    ><span class="cost-range__euro">77.60 € – 643.86 €</span>
    <Button>Подробнее</Button>
  </div>
</template>

<script setup>
import Button from "@/UI/Button/index";
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
}
img {
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
