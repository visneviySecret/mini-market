<template>
  <div class="wrapper">
    <img
      src="~/assets/icons/cart/badge.svg"
      style="width: 32px; height: 32px"
    />
    <div class="cart-stats">
      <span class="title">Ваша корзина</span>
      <span class="products">3 товара</span>
      <span class="cost">50 576 ₽</span>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
div {
  display: flex;
}
.wrapper {
  gap: 12px;
  height: 90px;
  font-weight: 400;
  margin-left: auto;
  align-items: center;

  .title {
    font-size: 14px;
  }

  .products,
  .cost {
    font-size: 12px;
    line-height: 145%;
  }
  .products {
    margin-top: -2px;
    color: #797b86;
  }
  .cost {
    margin-top: -2px;
  }

  .cart-stats {
    flex-direction: column;
  }
}
</style>
