<template>
  <div class="product-card">
    <div class="product-image-wrap">
      <img :src="product.photo" :alt="product.name" class="product-image" />
    </div>

    <div class="product-body">
      <h3 class="product-title">{{ product.name }}</h3>
      <p class="product-description">
        {{ product.description }}
      </p>

      <div class="product-footer">
        <div class="product-price-block">
          <span class="product-price">{{ formattedPrice }}</span>
          <span class="product-currency">₽</span>
        </div>

        <ControlButtons
          v-if="storedProduct && storedProduct.count > 0"
          :count="storedProduct.count"
          :cost="getFormatNumber(product.price)"
          :handleIncrement="handleAddProductToCart"
          :handleDecrement="handleRemoveProductFromCart"
        />
        <button
          v-else
          type="button"
          class="product-button"
          @click="handleAddProductToCart()"
        >
          В корзину
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { getFormatNumber } from "@/utils/getFormatNumber";
import ControlButtons from "~/Share/ControlButtons/index.vue";

const props = defineProps<{
  product: Product;
}>();

const store = useStore();

const storedProduct = computed(() => {
  return store.state.cart.products.find(
    (item: { product: Product }) => item.product.id === props.product.id
  );
});

const handleAddProductToCart = () => {
  store.dispatch("addProductToCart", props.product);
};

const handleRemoveProductFromCart = () => {
  store.commit("removeProductFromCart", props.product.id);
};

const formattedPrice = computed(() =>
  props.product.price.toLocaleString("ru-RU")
);
</script>

<style scoped lang="scss">
.product-card {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
  overflow: hidden;
  transition: box-shadow 0.15s ease;
  width: 300px;
  height: 400px;
}

.product-card:hover {
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
}

.product-image-wrap {
  position: relative;
  padding-top: 90%;
  overflow: hidden;
  background: linear-gradient(135deg, #e5e7eb, #f9fafb);
}

.product-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-body {
  padding: 16px 16px 18px;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 8px;
}

.product-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

.product-description {
  margin: 0;
  font-size: 13px;
  line-height: 1.4;
  color: #6b7280;
  max-height: 3.2em;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-price-block {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.product-price {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}

.product-currency {
  font-size: 13px;
  color: #6b7280;
}

.product-button {
  padding: 8px 14px;
  border-radius: 999px;
  border: none;
  background-color: #2563eb;
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease, transform 0.05s ease,
    box-shadow 0.15s ease;
  box-shadow: 0 4px 9px rgba(37, 99, 235, 0.35);
}

.product-button:hover {
  background-color: #1d4ed8;
}

.product-button:active {
  transform: translateY(1px);
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.35);
}
</style>
