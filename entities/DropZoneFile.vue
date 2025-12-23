<template>
  <DropZone
    :previews="props.previews"
    :placeholder-text="props.previewText"
    :multiple="props.multiple"
    accept=".pdf,application/pdf"
    @update:previews="emit('update:previews', $event)"
  >
    <template #preview="{ previews, removePreview }">
      <div class="preview-list">
        <div
          v-for="(item, index) in previews"
          :key="index"
          class="preview-item"
        >
          <div class="file-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="#ef4444"
                opacity="0.2"
              />
              <path
                d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
                stroke="#ef4444"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span class="file-name">{{ getFileName(item) }}</span>
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

const getFileName = (item: string | FilePreview): string => {
  if (typeof item === "string") {
    return "Файл";
  }
  return item.name;
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
  padding: 16px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  min-width: 140px;
}
.file-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ef4444;
}
.file-name {
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
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


