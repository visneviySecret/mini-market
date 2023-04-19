<template>
  <div class="wrapper">
    <img src="~/assets/images/img1.png" alt="Вытяжное устройство G2H" />
    <div class="content">
      <h3 class="content__title">Вытяжное устройство G2H</h3>
      <p class="content__specs">
        12-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия
      </p>
      <p class="content__article">Артикул: G2H1065</p>
    </div>
    <ControlButtons />
    <span class="cost">12 644 ₽</span>
    <div class="cross-wrapper">
      <CrossIcon />
    </div>
  </div>
</template>

<script setup>
import CrossIcon from "@/UI/CrossIcon/index";
import ControlButtons from "@/Share/ControlButtons/index";
console.log("hi from product card)");
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
