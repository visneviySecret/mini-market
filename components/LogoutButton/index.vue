<template>
  <div class="leave-button">
    <button @click="handleLeave">{{ "<- " }}Выйти из аккаунта</button>
  </div>
</template>

<script setup lang="ts">
const auth = useCookie<string | undefined>(
  import.meta.env.VITE_RESRESH_TOKEN as string
);

const handleLeave = () => {
  auth.value = undefined;
  navigateTo("/authorize");
};
</script>
