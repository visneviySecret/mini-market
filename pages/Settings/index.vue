<template>
  <div class="settings-page">
    <h1 class="page-title">Адреса доставки</h1>
    <button type="button" class="add-button" @click="handleAddAddress">
      Добавить адрес
    </button>
    <div v-if="loading" class="loading-state">Loading...</div>
    <div v-else-if="addresses.length === 0" class="empty-state">
      <p>У вас пока нет сохранённых адресов</p>
    </div>
    <div v-else class="addresses-list">
      <div v-for="address in addresses" :key="address.id" class="address-card">
        <div class="address-info">
          <p class="address-line"><strong>Город:</strong> {{ address.city }}</p>
          <p class="address-line">
            <strong>Улица:</strong> {{ address.street }}
          </p>
          <p class="address-line">
            <strong>Индекс:</strong> {{ address.index }}
          </p>
          <p class="address-line">
            <strong>Телефон:</strong> {{ address.phone }}
          </p>
        </div>
        <div class="address-actions">
          <button
            type="button"
            class="edit-button"
            @click="handleEditAddress(address)"
          >
            Редактировать
          </button>
          <button
            type="button"
            class="delete-button"
            @click="handleRemoveAddress(address.id)"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
    <UserSettingsModal
      :open="isModalOpen"
      :address="editingAddress"
      @close="handleCloseModal"
      @submit="handleSubmitAddress"
    />
  </div>
</template>

<script setup lang="ts">
import { getUserMe } from "~/api/user";
import { deleteAddress } from "~/api/address";
import UserSettingsModal from "~/components/UserSettingsModal/index.vue";
import { useStore } from "vuex";

const store = useStore();
const isModalOpen = ref(false);
const loading = ref(true);
const editingAddress = ref<{
  id: number;
  city: string;
  street: string;
  index: string;
  phone: string;
} | null>(null);

const addresses = computed(() => store.getters.userAddresses || []);

const handleAddAddress = () => {
  editingAddress.value = null;
  isModalOpen.value = true;
};

const handleEditAddress = (address: {
  id: number;
  city: string;
  street: string;
  index: string;
  phone: string;
}) => {
  editingAddress.value = { ...address };
  isModalOpen.value = true;
};

const handleCloseModal = () => {
  isModalOpen.value = false;
  editingAddress.value = null;
};

const handleSubmitAddress = async (address: {
  id: number;
  city: string;
  street: string;
  index: string;
  phone: string;
}) => {
  if (editingAddress.value) {
    await store.dispatch("updateAddress", {
      id: address.id,
      address: {
        city: address.city,
        street: address.street,
        index: address.index,
        phone: address.phone,
      },
    });
  } else {
    await store.dispatch("addAddress", address);
  }
  handleCloseModal();
};

const handleRemoveAddress = async (addressId: number) => {
  try {
    await deleteAddress(String(addressId));
    store.dispatch("removeAddress", addressId);
  } catch (error) {
    console.error("Ошибка удаления адреса:", error);
  }
};

onMounted(async () => {
  try {
    const userData = await getUserMe();
    store.dispatch("setUser", userData);
  } catch (error) {
    console.error("Ошибка загрузки пользователя:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped lang="scss">
.settings-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.page-title {
  margin: 0 0 24px;
  font-size: 28px;
  font-weight: 600;
}
.add-button {
  margin-bottom: 24px;
  padding: 10px 18px;
  border-radius: 999px;
  border: none;
  background: #2563eb;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s ease;
}
.add-button:hover {
  background: #1d4ed8;
}
.loading-state {
  padding: 60px 20px;
  text-align: center;
  color: #6b7280;
  font-size: 16px;
}
.empty-state {
  padding: 60px 20px;
  text-align: center;
  color: #6b7280;
  font-size: 16px;
}
.addresses-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.address-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
}
.address-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.address-line {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #1f2432;
}
.address-line strong {
  color: #6b7280;
  margin-right: 8px;
}
.address-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}
.edit-button {
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #2563eb;
  background: transparent;
  color: #2563eb;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}
.edit-button:hover {
  background: #2563eb;
  color: #ffffff;
}
.delete-button {
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #dc2626;
  background: transparent;
  color: #dc2626;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}
.delete-button:hover {
  background: #dc2626;
  color: #ffffff;
}
</style>
