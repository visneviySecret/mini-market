<template>
  <div class="container">
    <header>
      <NavBar />
      <RouterMenu />
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
header {
  margin-bottom: 50px;
}
</style>
