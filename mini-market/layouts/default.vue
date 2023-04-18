<template>
  <div class="container">
    <header>
      <NavBar />
      <RouterPath />
    </header>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  max-width: min(95%, 1280px);
  margin-inline: auto;
  color: #1f2432;
}
</style>
