<template>
  <div>
    <div class="panel">
      <h3>Просмотренные товары</h3>
      <CarouselControl />
    </div>
    <div class="carousel">
      <CarouselCard />
    </div>
  </div>
</template>

<script setup>
import CarouselControl from "@/Share/CarouselControl/index";
import CarouselCard from "@/Share/CarouselCard/index";
</script>

<style lang="scss" scoped>
.panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 60px;
}
h3 {
  font-size: 30px;
}
.carousel {
}
</style>
