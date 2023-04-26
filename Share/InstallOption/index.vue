<template>
  <div class="scope-wrapper">
    <CheckboxComponent />
    <div class="img-wrapper">
      <img src="@/assets/icons/install.svg" />
    </div>
    <div>
      <h3>Установка</h3>
      <span>
        Отметьте, если Вам необходима консультация профессионала по монтажу
        выбранных товаров.
      </span>
    </div>
  </div>
</template>

<script setup>
import CheckboxComponent from "@/UI/CheckboxComponent/index";
</script>

<style lang="scss" scoped>
.scope-wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 28px 43px;
  background-color: #f6f8fa;
  border-radius: 5px;
}
.img-wrapper {
  width: 30px;
  height: 30px;
  background: #ffffff;
  border-radius: 4px;
  padding: 10px;
}
h3 {
  margin-bottom: 2px;
}
span {
  font-size: 14px;
  line-height: 150%;
  color: #797b86;
}
</style>
