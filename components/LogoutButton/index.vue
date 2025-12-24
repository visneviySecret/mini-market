<template>
  <div class="leave-button">
    <button @click="handleLeave">{{ "< " }}Выйти из аккаунта</button>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { logout } from "~/api/auth";

const store = useStore();

const auth = useCookie<string | undefined>(
  import.meta.env.VITE_REFRESH_TOKEN as string
);

const handleLeave = async () => {
  auth.value = undefined;
  store.commit("clearUser");
  await logout();
  navigateTo("/authorize");
};
</script>
