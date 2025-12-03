<template>
  <div v-if="error">
    <p>{{ error }}</p>
  </div>
  <div v-else-if="loading">
    <p>Загрузка...</p>
  </div>
  <div v-else>
    <div v-if="products.length === 0">
      <p class="empty-products">Ничего не найдено</p>
    </div>
    <div v-else>
      <div class="products-grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="onAddToCart"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getProducts } from "~/api/product";
import ProductCard from "~/entities/ProductCard.vue";

const products = ref<Product[]>([]);
const error = ref<string | undefined>(undefined);
const loading = ref<boolean>(false);

onMounted(async () => {
  try {
    loading.value = true;
    products.value = await getProducts();
    console.log(products.value);
  } catch (err) {
    error.value = (err as Error).message ?? "Ошибка получения продуктов";
  } finally {
    loading.value = false;
  }
});

const onAddToCart = (product: Product) => {
  console.log(product);
};
</script>

<style scoped lang="scss">
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
.empty-products {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #666;
}
</style>
