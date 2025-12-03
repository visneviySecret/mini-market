<template>
  <div v-if="open" class="modal-backdrop">
    <div class="modal">
      <h2 class="modal-title">
        {{ address ? "Редактировать адрес" : "Адрес доставки" }}
      </h2>
      <form class="modal-form" @submit.prevent="handleSubmit">
        <label class="field">
          <span>Город</span>
          <input v-model="city" type="text" required />
        </label>
        <label class="field">
          <span>Улица</span>
          <input v-model="street" type="text" required />
        </label>
        <label class="field">
          <span>Индекс</span>
          <input v-model="index" type="text" required />
        </label>
        <label class="field">
          <span>Телефон</span>
          <input v-model="phone" type="tel" required />
        </label>
        <div class="actions">
          <button type="button" class="button secondary" @click="emitClose">
            Отмена
          </button>
          <button
            type="submit"
            class="button primary"
            :class="{ disabled: loading || disabled }"
            :disabled="loading || disabled"
          >
            {{ loading ? "Сохранение..." : "Сохранить" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { createAddress, updateAddress } from "~/api/address";

const store = useStore();
const user = computed(() => store.getters.user);
const props = defineProps<{
  open: boolean;
  address?: {
    id: number;
    city: string;
    street: string;
    index: string;
    phone: string;
  } | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (
    e: "submit",
    address: {
      id: number;
      city: string;
      street: string;
      index: string;
      phone: string;
    }
  ): void;
}>();

const city = ref("");
const street = ref("");
const index = ref("");
const phone = ref("");

watch(
  () => props.address,
  (newAddress) => {
    if (newAddress) {
      city.value = newAddress.city;
      street.value = newAddress.street;
      index.value = newAddress.index;
      phone.value = newAddress.phone;
    } else {
      city.value = "";
      street.value = "";
      index.value = "";
      phone.value = "";
    }
  },
  { immediate: true }
);
const loading = ref(false);
const disabled = computed(() => {
  return (
    loading.value ||
    !city.value.trim() ||
    !street.value.trim() ||
    !index.value.trim() ||
    !phone.value.trim()
  );
});

const emitClose = () => {
  city.value = "";
  street.value = "";
  index.value = "";
  phone.value = "";
  emit("close");
};

const handleSubmit = async () => {
  const payload = {
    user_id: user.value.id,
    city: city.value,
    street: street.value,
    index: index.value,
    phone: phone.value,
  };
  try {
    loading.value = true;
    if (props.address) {
      const updatedAddress = await updateAddress(
        String(props.address.id),
        payload
      );
      emit("submit", updatedAddress);
    } else {
      const createdAddress = await createAddress(payload);
      emit("submit", createdAddress);
    }
    emitClose();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}
.modal {
  width: 100%;
  max-width: 420px;
  border-radius: 16px;
  background: #ffffff;
  padding: 24px 22px 20px;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.3);
}
.modal-title {
  margin: 0 0 16px;
  font-size: 20px;
  font-weight: 600;
}
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
}
.field span {
  color: #6b7280;
}
.field input {
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
}
.field input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.2);
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 10px;
}
.button {
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 14px;
  cursor: pointer;
}
.button.secondary {
  background: #f3f4f6;
  border-color: #e5e7eb;
}
.button.primary {
  background: #2563eb;
  color: #ffffff;
}
.button.disabled {
  background: #e5e7eb;
  border-color: #e5e7eb;
  cursor: not-allowed;
}
</style>
