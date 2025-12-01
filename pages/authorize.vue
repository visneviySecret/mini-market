<template>
  <div class="auth">
    <div class="auth-card">
      <div class="auth-tabs">
        <button
          class="auth-tab"
          :class="{ 'auth-tab--active': mode === 'login' }"
          type="button"
          @click="mode = 'login'"
        >
          Вход
        </button>
        <button
          class="auth-tab"
          :class="{ 'auth-tab--active': mode === 'register' }"
          type="button"
          @click="mode = 'register'"
        >
          Регистрация
        </button>
      </div>
      <h1 class="auth-title">
        {{ mode === "login" ? "Вход в аккаунт" : "Создание аккаунта" }}
      </h1>
      <form class="auth-form" @submit.prevent="onSubmit">
        <label class="auth-field">
          <span class="auth-label">Email</span>
          <input v-model="email" type="email" class="auth-input" required />
        </label>
        <label class="auth-field">
          <span class="auth-label">Пароль</span>
          <input
            v-model="password"
            type="password"
            class="auth-input"
            required
            minlength="4"
          />
        </label>
        <label v-if="mode === 'register'" class="auth-field">
          <span class="auth-label">Повторите пароль</span>
          <input
            v-model="passwordRepeat"
            type="password"
            class="auth-input"
            required
            minlength="4"
          />
        </label>
        <p v-if="mode === 'register'" class="auth-helper">
          Пароль должен содержать не менее 4 символов
        </p>
        <p v-if="error" class="auth-error">{{ error }}</p>
        <button type="submit" class="auth-button">
          {{ mode === "login" ? "Войти" : "Зарегистрироваться" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  layout: false,
});

const mode = ref<"login" | "register">("login");
const email = ref("");
const password = ref("");
const passwordRepeat = ref("");
const error = ref("");

const router = useRouter();
const auth = useCookie<string | null>("auth_token");

const onSubmit = () => {
  error.value = "";

  if (!email.value || !password.value) {
    error.value = "Введите email и пароль";
    return;
  }

  if (mode.value === "register") {
    if (!passwordRepeat.value) {
      error.value = "Повторите пароль";
      return;
    }
    if (password.value !== passwordRepeat.value) {
      error.value = "Пароли не совпадают";
      return;
    }
  }

  auth.value = "ok";
  router.push("/");
};
</script>

<style scoped lang="scss">
.auth {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f6fa;
}
.auth-card {
  width: 100%;
  max-width: 420px;
  padding: 32px 28px 28px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.08);
}
.auth-tabs {
  display: flex;
  gap: 8px;
  padding: 4px;
  border-radius: 999px;
  background: #f3f4f6;
  margin-bottom: 20px;
}
.auth-tab {
  flex: 1;
  padding: 8px 0;
  border-radius: 999px;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}
.auth-tab--active {
  background: #2563eb;
  color: #ffffff;
}
.auth-title {
  margin: 0 0 20px;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
}
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.auth-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
}
.auth-label {
  color: #6b7280;
}
.auth-input {
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.auth-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.25);
}
.auth-helper {
  margin: -6px 0 0;
  font-size: 12px;
  color: #6b7280;
}
.auth-error {
  margin: 0;
  font-size: 13px;
  color: #dc2626;
}
.auth-button {
  margin-top: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  background: #2563eb;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.05s ease;
}
.auth-button:hover {
  background: #1d4ed8;
}
.auth-button:active {
  transform: translateY(1px);
}
</style>


