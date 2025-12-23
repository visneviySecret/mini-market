<template>
  <DropZone
    :previews="props.previews"
    :placeholder-text="props.previewText"
    :multiple="props.multiple"
    accept="image/*"
    @update:previews="emit('update:previews', $event)"
  >
    <template #preview="{ previews, removePreview }">
      <div class="preview-list">
        <div
          v-for="(item, index) in previews"
          :key="index"
          class="preview-item"
        >
          <img :src="getDataUrl(item)" alt="preview" class="preview-img" />
          <button
            type="button"
            class="preview-clear"
            @click.prevent="removePreview(index)"
          >
            Убрать
          </button>
        </div>
      </div>
    </template>
  </DropZone>
</template>

<script setup lang="ts">
import DropZone from "~/UI/DropZone/index.vue";

interface FilePreview {
  dataUrl: string;
  name: string;
}

const props = defineProps<{
  previews: (string | FilePreview)[];
  previewText?: string;
  multiple?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:previews", value: (string | FilePreview)[]): void;
}>();

const getDataUrl = (item: string | FilePreview): string => {
  if (typeof item === "string") {
    return item;
  }
  return item.dataUrl;
};
</script>

<style scoped lang="scss">
.preview-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}
.preview-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.preview-img {
  max-width: 180px;
  max-height: 120px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.12);
}
.preview-clear {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #334155;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
.preview-clear:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}
</style>
