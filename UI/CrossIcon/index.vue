<template>
  <div>
    <button>
      <span />
    </button>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
span {
  display: block;
  rotate: 45deg;

  &::before,
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    width: 12px;
    height: 1.5px;
    background-color: #1f2432;
  }
  &::after {
    rotate: 90deg;
  }
}
button {
  width: 12px;
  height: 12px;
}
</style>
