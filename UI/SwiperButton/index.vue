<template>
  <button>
    <div>
      <span />
    </div>
  </button>
</template>

<script setup></script>

<style lang="scss" scoped>
div {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #90a2b5;
  position: relative;
}
span {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;

  &::before,
  &::after {
    content: "";
    translate: -50% -50%;
    top: 4px;
    position: absolute;
    height: 2px;
    width: 12px;
    border-radius: 5px;
    background-color: #ffffff;
    rotate: 45deg;
  }
  &::after {
    rotate: -45deg;
    top: -4px;
  }
}
</style>
