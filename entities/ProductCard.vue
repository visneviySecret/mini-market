<template>
  <div class="product-card">
    <div
      class="product-image-wrap"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <img :src="currentImage" :alt="product.name" class="product-image" />
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

        <button
          type="button"
          class="product-button"
          :class="{ 'product-button--in-cart': isInCart }"
          @click="handleAddProductToCart()"
        >
          {{ isInCart ? "В корзине" : "В корзину" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { useStore } from "vuex";

const props = defineProps<{
  product: Product;
}>();

const store = useStore();
const isHovered = ref(false);

const storedProduct = computed(() => {
  return store.getters.allCart.find(
    (item: { product: Product }) => item.product.id === props.product.id
  );
});

const isInCart = computed(
  () => !!storedProduct.value && storedProduct.value.count > 0
);

const handleAddProductToCart = () => {
  if (!isInCart.value) {
    store.dispatch("addProductToCart", props.product);
  } else {
    store.dispatch("removeProductFromCart", props.product.id);
  }
};

const formattedPrice = computed(() =>
  props.product.price.toLocaleString("ru-RU")
);

const currentImage = computed(() => {
  if (isHovered.value && props.product.preview) {
    return props.product.preview;
  }
  return props.product.images[0];
});
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
  transition: opacity 0.3s ease;
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

.product-in-cart-label {
  margin-left: 8px;
  font-size: 12px;
  color: #16a34a;
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

.product-button--in-cart {
  background-color: #16a34a;
  box-shadow: none;
}

.product-button:hover {
  opacity: 0.7;
  transition: opacity 0.15s;
}

.product-button:active {
  transform: translateY(1px);
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.35);
}
</style>
