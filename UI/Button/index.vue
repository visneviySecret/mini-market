<template>
  <div>
    <button :class="[themeStyle]" :disabled="disabled" @click="onClick">
      <slot />
    </button>
  </div>
</template>

<script setup>
const { theme, onClick, disabled } = defineProps([
  "theme",
  "onClick",
  "disabled",
]);
const themeStyle = theme || "primal";
</script>

<style lang="scss" scoped>
button {
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  padding-block: 14px;
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
.primal {
  background: #0069b4;
  color: #ffffff;
}
.outlined {
  background: #ffffff;
  border: 1px solid #0069b4;
  color: #0069b4;
}
</style>
