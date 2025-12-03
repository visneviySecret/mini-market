<template>
  <div class="container">
    <Swiper
      :space-between="20"
      :slides-per-view="4"
      :slidesPerGroup="4"
      :allow-touch-move="false"
    >
      <div class="panel swiper-pagination">
        <h3>Просмотренные товары</h3>
        <SwiperControl :pages="mockCards.length / 4" />
      </div>
      <SwiperSlide v-for="card in mockCards" v-bind:key="card.id">
        <SwiperCard :card="card" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import SwiperControl from "@/Share/SwiperControl/index";
import SwiperCard from "@/Share/SwiperCard/index";
import { Swiper, SwiperSlide } from "swiper/vue";
// import { products } from "@/content/mockData";
import "swiper/css";
import "swiper/css/pagination";
export default {
  components: {
    SwiperControl,
    SwiperCard,
    Swiper,
    SwiperSlide,
  },
  setup() {
    let mockCards = [];
    // for (let i = 0; i <= 5; i++) {
    //   mockCards = mockCards.concat(
    //     products.map((product) => {
    //       return { ...product, id: Math.random() * Date.now() };
    //     })
    //   );
    // }
    return {
      mockCards,
    };
  },
};
</script>

<style lang="scss" scoped>
.panel {
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 60px;
}
h3 {
  font-size: 30px;
}
.swiper-slide {
  max-width: 305px;
}
</style>
