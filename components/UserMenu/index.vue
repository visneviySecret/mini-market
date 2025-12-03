<template>
  <div class="user-menu" ref="dropdownRef">
    <button type="button" class="user-button" @click.stop="toggle">
      <span class="user-avatar">U</span>
      <span class="user-label">Аккаунт</span>
    </button>
    <div v-if="isOpen" class="user-dropdown">
      <button type="button" class="user-item" @click.stop="openSettings">
        Настройки
      </button>
      <LogoutButton class="user-item user-item--logout" />
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoutButton from "~/components/LogoutButton/index.vue";

const isOpen = ref(false);
const dropdownRef = ref<HTMLDivElement | null>(null);

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const openSettings = () => {
  isOpen.value = false;
  navigateTo("/settings");
};

const handleClickOutside = (e: Event) => {
  if (!dropdownRef.value) return;
  if (!(e.target instanceof Node)) return;
  if (!dropdownRef.value.contains(e.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped lang="scss">
.user-menu {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 24px;
}
.user-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  font-size: 14px;
  cursor: pointer;
}
.user-avatar {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: #2563eb;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}
.user-label {
  white-space: nowrap;
}
.user-dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  min-width: 180px;
  padding: 8px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.16);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.user-item {
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  border: none;
  background: transparent;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
}
.user-item:hover {
  background: #f3f4f6;
}
.user-item--logout {
  color: #dc2626;
}
.user-item--logout button {
  width: 100%;
  text-align: left;
}
</style>
