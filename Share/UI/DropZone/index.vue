<template>
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
    <p v-if="!preview">{{ previewText }}</p>
    <div v-else class="dropzone__preview">
      <img :src="preview" alt="preview" />
      <button type="button" class="dropzone__clear" @click.stop="clearPreview">
        Убрать
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  preview: string | null;
  previewText?: string;
}>();

const emit = defineEmits<{
  (e: "update:preview", value: string | null): void;
}>();

const isDragActive = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const handleFile = async (file: File) => {
  if (!file.type.startsWith("image/")) return;
  const dataUrl = await readFileAsDataUrl(file);
  emit("update:preview", dataUrl);
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
  emit("update:preview", null);
  if (fileInput.value) fileInput.value.value = "";
};
</script>

<style scoped lang="scss">
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
