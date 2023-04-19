<template>
  <div>
    <div class="wrapper">
      <div class="content">
        <header>
          <h1>Ваша корзина</h1>
          <span class="cart-counter">4 товара</span>
          <span class="clear-cart">Очистить корзину</span>
        </header>
        <div class="product-list">
          <ProductBuyCard />
          <InstallOption />
        </div>
      </div>
      <div class="aside">
        <BuySummary />
      </div>
    </div>
    <ViewedProducts />
  </div>
</template>

<script setup>
import ProductBuyCard from "@/Share/ProductBuyCard/index";
import InstallOption from "@/Share/InstallOption/index";
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  gap: min(3vw, 55px);
  justify-content: space-between;
}
.content {
  flex: 3;
  margin-bottom: 95px;
  max-width: 800px;
}
.aside {
  flex: 1;
  margin-top: 100px;
}
header {
  display: flex;
  align-items: baseline;
  margin-bottom: 25px;
}
.product-list {
  min-height: 436px;
}
.cart-counter {
  margin-left: 22px;
  font-size: 18px;
  color: #797b86;
}
.clear-cart {
  margin-left: auto;
  font-size: 14px;
  text-decoration-line: underline;
  color: #797b86;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
}
</style>
