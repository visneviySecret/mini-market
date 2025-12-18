<template>
  <div class="scope-wrapper">
    <h2>Итого</h2>
    <ul>
      <li>
        <span>Сумма заказа</span
        ><span>{{ getFormatNumber(cartStats.cost) }} ₽</span>
      </li>
      <li>
        <span>Количество</span><span>{{ cartStats.count }} шт</span>
      </li>
    </ul>
    <div class="finale-cost">
      <h3>Стоимость товаров</h3>
      <span class="cost">{{ getFormatNumber(cartStats.cost) }} ₽</span>
    </div>
    <SummaryButtons />
  </div>
</template>

<script>
import SummaryButtons from "@/Share/SummaryButtons/index.vue";
import { mapGetters } from "vuex";
import { getFormatNumber } from "~/utils/getFormatNumber";

export default {
  props: ["product", "count"],

  computed: {
    ...mapGetters(["cartStats"]),
  },
  components: {
    SummaryButtons,
  },
};
</script>

<style lang="scss" scoped>
.scope-wrapper {
  max-width: 365px;
  background: #f6f8fa;
  border-radius: 5px;
  padding: 35px 30px;
}
h2 {
  margin-bottom: 30px;
}
ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 17px;
  padding-bottom: 30px;
  border-bottom: 1px solid #aeb0b6;
}
li {
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
}
h3 {
  font-size: 18px;
}
.finale-cost,
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.finale-cost {
  margin-block: 10px 30px;
}
.cost {
  font-family: "Roboto";
  font-weight: 700;
  font-size: 26px;
  line-height: 130%;

  text-align: right;
  letter-spacing: 0.005em;

  color: #1f2432;
}
</style>
