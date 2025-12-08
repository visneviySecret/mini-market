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

<script setup>
import { getUserMe } from "~/api/user";
import { useStore } from "vuex";

const store = useStore();
const auth = useCookie(import.meta.env.VITE_RESRESH_TOKEN);

onMounted(async () => {
  if (auth.value && !store.getters.user?.id) {
    try {
      const userData = await getUserMe();
      store.dispatch("setUser", userData);
    } catch (error) {
      console.error("Ошибка загрузки пользователя:", error);
    }
  }
});
</script>

<style lang="scss" scoped>
.container {
  max-width: min(95%, 1280px);
  margin-inline: auto;
  margin-bottom: 115px;
  color: #1f2432;
}
header {
  margin-bottom: 50px;
}
</style>
