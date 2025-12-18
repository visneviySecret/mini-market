<template>
  <div class="page">
    <h1>Новый товар</h1>
    <form class="form" @submit.prevent="handleSubmit">
      <label class="field">
        <span>Название</span>
        <input v-model="name" type="text" required />
      </label>
      <label class="field">
        <span>Описание</span>
        <textarea v-model="description" required></textarea>
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
      <div
        class="dropzone"
        :class="{ 'dropzone--active': isDragActive }"
        @dragover.prevent="isDragActive = true"
        @dragleave.prevent="isDragActive = false"
        @drop.prevent="handleDrop"
        @click="fileInput?.click()"
      >
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="dropzone__input"
          @change="handleFileChange"
        />
        <p v-if="!photoPreview">
          Перетащите изображение или кликните для выбора
        </p>
        <div v-else class="dropzone__preview">
          <img :src="photoPreview" alt="preview" />
          <button
            type="button"
            class="dropzone__clear"
            @click.stop="clearPreview"
          >
            Убрать
          </button>
        </div>
      </div>
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit" class="button" :disabled="loading">
        {{ loading ? "Сохранение..." : "Создать" }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { createProduct } from "~/api/product";
import dataURLtoBlob from "~/utils/dataURLtoBlob";

const name = ref("");
const description = ref("");
const price = ref<number | null>(null);
const photoPreview = ref<string | null>(null);
const isDragActive = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const loading = ref(false);
const error = ref("");

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const handleFile = async (file: File) => {
  if (!file.type.startsWith("image/")) return;
  photoPreview.value = await readFileAsDataUrl(file);
};

const handleDrop = async (e: DragEvent) => {
  isDragActive.value = false;
  if (!e.dataTransfer?.files?.length) return;
  const file = e.dataTransfer.files[0];
  await handleFile(file);
};

const handleFileChange = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!target.files?.length) return;
  const file = target.files[0];
  await handleFile(file);
};

const clearPreview = () => {
  photoPreview.value = null;
  if (fileInput.value) fileInput.value.value = "";
};

const handleSubmit = async () => {
  if (price.value === null) return;
  try {
    loading.value = true;
    error.value = "";
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("description", description.value);
    formData.append("price", price.value.toString());
    formData.append("photo", dataURLtoBlob(photoPreview.value || ""));
    await createProduct(formData as unknown as CreateProductPayload);
    name.value = "";
    description.value = "";
    price.value = null;
    photoPreview.value = null;
    if (fileInput.value) fileInput.value.value = "";
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
.dropzone {
  margin-top: 4px;
  padding: 18px;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  background: #f8fafc;
  color: #475569;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
  min-height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dropzone--active {
  border-color: #2563eb;
  background: #eff6ff;
  color: #1d4ed8;
}
.dropzone__input {
  display: none;
}
.dropzone__preview {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
}
.dropzone__preview img {
  max-width: 180px;
  max-height: 120px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.12);
}
.dropzone__clear {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #334155;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
.dropzone__clear:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}
</style>
