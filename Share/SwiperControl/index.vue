<template>
  <div>
    <SwiperButton @click="swiper.slidePrev()" />
    <div class="counter">
      <span class="counter__count">{{
        Math.round((swiper.activeIndex + 2) / 4)
      }}</span
      ><span class="counter__total-pages">/ {{ pages }}</span>
    </div>
    <SwiperButton @click="swiper.slideNext()" class="right" />
  </div>
</template>

<script>
import SwiperButton from "@/UI/SwiperButton/index";
import { useSwiper } from "swiper/vue";
import "swiper/css";

export default {
  props: ["pages", "handleRight"],
  components: { SwiperButton },
  setup() {
    const swiper = useSwiper();

    return {
      swiper,
    };
  },
};
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
