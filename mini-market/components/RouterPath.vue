<template>
  <div>Router</div>
</template>

<script setup>
const route = useRouter();
console.log(route.currentRoute._value.fullPath);
</script>

<style lang="scss" scoped></style>
