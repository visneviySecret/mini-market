<template>
  <div class="page">
    <h1>Новый товар</h1>
    <form class="form" @submit.prevent="handleSubmit">
      <label class="field">
        <span>Название</span>
        <input v-model="name" type="text" required />
      </label>
      <label class="field">
        <span>Изображения</span>
        <DropZoneImage
          v-model:previews="photoPreviews"
          :previewText="'Перетащите изображение или кликните для выбора'"
          multiple
        />
      </label>
      <label class="field">
        <span>Цена</span>
        <input
          v-model.number="price"
          type="number"
          min="0"
          step="0.01"
          required
        />
      </label>
      <label class="field">
        <span>Предпросмотр</span>
        <DropZoneImage
          v-model:previews="gifPreview"
          :previewText="'Перетащите gif или кликните для выбора'"
        />
      </label>
      <label class="field">
        <span>Инструкция</span>
        <DropZoneFile
          v-model:previews="pdfPreview"
          :previewText="'Перетащите pdf или кликните для выбора'"
        />
      </label>
      <label class="field">
        <span>Описание</span>
        <textarea v-model="description" required></textarea>
      </label>
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit" class="button" :disabled="loading">
        {{ loading ? "Сохранение..." : "Создать" }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import DropZoneImage from "~/entities/DropZoneImage.vue";
import DropZoneFile from "~/entities/DropZoneFile.vue";
import { createProduct } from "~/api/product";
import dataURLtoBlob from "~/utils/dataURLtoBlob";

const name = ref("");
const description = ref("");
const price = ref<number | null>(null);
const photoPreviews = ref<string[]>([]);
const gifPreview = ref<string[]>([]);
const pdfPreview = ref<string[]>([]);
const loading = ref(false);
const error = ref("");

const handleSubmit = async () => {
  if (price.value === null) return;
  try {
    loading.value = true;
    error.value = "";
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("description", description.value);
    formData.append("price", price.value.toString());
    formData.append("photo", dataURLtoBlob(photoPreviews.value[0] || ""));
    await createProduct(formData as unknown as CreateProductPayload);
    name.value = "";
    description.value = "";
    price.value = null;
    photoPreviews.value = [];
    gifPreview.value = [];
    navigateTo("/");
  } catch (e) {
    error.value = (e as Error).message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
.page {
  max-width: 640px;
  margin: 0 auto;
  padding: 24px;
}
h1 {
  margin-bottom: 20px;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field span {
  font-size: 14px;
  color: #6b7280;
}
input,
textarea {
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 14px;
}
textarea {
  min-height: 100px;
  resize: vertical;
}
.button {
  margin-top: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  background: #2563eb;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
}
.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.error {
  color: #dc2626;
  font-size: 13px;
}
</style>
