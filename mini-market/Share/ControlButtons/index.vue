<template>
  <div>
    <ControlButton />
    <ControlButton />
    <ControlButton />
  </div>
</template>

<script setup>
import ControlButton from "@/UI/ControlButton/index.vue";
</script>

<style lang="scss" scoped>
div {
  display: flex;
  gap: 2px;
}
</style>
