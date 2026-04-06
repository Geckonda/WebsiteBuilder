<template>
  <div class="builder">
    <div class="builder__header">
      <div>
        <h2 class="builder__title">{{ templateName }}</h2>
        <p class="builder__subtitle">Заполните блоки и сохраните лендинг</p>
      </div>
      <button
        class="builder__save-btn"
        :disabled="saving || blocks.length === 0"
        @click="handleSave"
      >
        <span v-if="saving">Сохранение...</span>
        <span v-else>Сохранить лендинг</span>
      </button>
    </div>

    <div v-if="saveSuccess" class="builder__success">
      Лендинг успешно сохранён на сервере!
    </div>

    <div v-if="saveError" class="builder__error">
      Ошибка: {{ saveError }}
    </div>

    <div v-if="blocks.length === 0" class="builder__empty">
      Все блоки удалены. Вернитесь к шаблону, чтобы начать заново.
    </div>

    <transition-group name="block-list" tag="div" class="builder__blocks">
      <div
        v-for="(block, index) in blocks"
        :key="block.id"
        class="builder-block"
      >
        <div class="builder-block__header">
          <div class="builder-block__meta">
            <span class="builder-block__num">{{ index + 1 }}</span>
            <span class="builder-block__label">{{ block.label }}</span>
            <span
              class="builder-block__type"
              :class="`builder-block__type--${block.type}`"
            >
              {{ block.type === 'text' ? 'Текст' : 'Изображение' }}
            </span>
          </div>
          <div class="builder-block__actions">
            <button
              class="icon-btn"
              title="Переместить вверх"
              :disabled="index === 0"
              @click="moveUp(index)"
            >
              ▲
            </button>
            <button
              class="icon-btn"
              title="Переместить вниз"
              :disabled="index === blocks.length - 1"
              @click="moveDown(index)"
            >
              ▼
            </button>
            <button
              class="icon-btn icon-btn--danger"
              title="Удалить блок"
              @click="removeBlock(block.id)"
            >
              ✕
            </button>
          </div>
        </div>

        <div class="builder-block__body">
          <!-- Текстовый блок -->
          <textarea
            v-if="block.type === 'text'"
            class="builder-block__textarea"
            :placeholder="`Введите содержимое блока «${block.label}»...`"
            :value="block.value"
            rows="4"
            @input="updateBlock(block.id, ($event.target as HTMLTextAreaElement).value)"
          />

          <!-- Блок с изображением -->
          <div v-else class="builder-block__image-wrap">
            <div v-if="block.value" class="builder-block__image-preview">
              <img :src="block.value" :alt="block.label" />
              <button
                class="builder-block__image-remove"
                @click="updateBlock(block.id, '')"
              >
                Удалить изображение
              </button>
            </div>
            <label v-else class="builder-block__image-label">
              <input
                type="file"
                accept="image/*"
                class="builder-block__file-input"
                @change="handleImageUpload(block.id, $event)"
              />
              <div class="builder-block__image-placeholder">
                <span class="builder-block__image-icon">🖼</span>
                <span>Нажмите, чтобы загрузить изображение</span>
                <span class="builder-block__image-hint">PNG, JPG, WEBP</span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useBuilderStore } from '../stores/builder'
import { storeToRefs } from 'pinia'

const store = useBuilderStore()
const { blocks, templateName, saving, saveError, saveSuccess } = storeToRefs(store)
const { updateBlock, moveUp, moveDown, removeBlock, save } = store

function handleImageUpload(blockId: string, event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    updateBlock(blockId, e.target?.result as string)
  }
  reader.readAsDataURL(file)
}

async function handleSave() {
  await save()
}
</script>

<style scoped>
.builder {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.builder__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.builder__title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
}

.builder__subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.builder__save-btn {
  background: #6366f1;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  transition: background 0.15s, opacity 0.15s;
  white-space: nowrap;
}

.builder__save-btn:hover:not(:disabled) {
  background: #4f46e5;
}

.builder__save-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.builder__success {
  background: #d1fae5;
  border: 1px solid #6ee7b7;
  color: #065f46;
  padding: 1rem 1.25rem;
  border-radius: 10px;
  font-weight: 500;
}

.builder__error {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  padding: 1rem 1.25rem;
  border-radius: 10px;
}

.builder__empty {
  text-align: center;
  padding: 3rem;
  background: #f9fafb;
  border: 1px dashed #d1d5db;
  border-radius: 12px;
  color: #6b7280;
}

.builder__blocks {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.builder-block {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.builder-block:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
}

.builder-block__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1.25rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  gap: 1rem;
}

.builder-block__meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.builder-block__num {
  width: 26px;
  height: 26px;
  background: #6366f1;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.builder-block__label {
  font-weight: 600;
  font-size: 0.95rem;
  color: #111827;
}

.builder-block__type {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 20px;
}

.builder-block__type--text {
  background: #ede9fe;
  color: #5b21b6;
}

.builder-block__type--image {
  background: #fef3c7;
  color: #92400e;
}

.builder-block__actions {
  display: flex;
  gap: 0.4rem;
  flex-shrink: 0;
}

.icon-btn {
  width: 30px;
  height: 30px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.7rem;
  color: #374151;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}

.icon-btn:hover:not(:disabled) {
  background: #e5e7eb;
}

.icon-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.icon-btn--danger:hover:not(:disabled) {
  background: #fee2e2;
  border-color: #fca5a5;
  color: #dc2626;
}

.builder-block__body {
  padding: 1.25rem;
}

.builder-block__textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  line-height: 1.6;
  resize: vertical;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  color: #111827;
}

.builder-block__textarea:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.builder-block__image-wrap {
  min-height: 120px;
}

.builder-block__file-input {
  display: none;
}

.builder-block__image-label {
  cursor: pointer;
  display: block;
}

.builder-block__image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2.5rem;
  border: 2px dashed #d1d5db;
  border-radius: 10px;
  color: #6b7280;
  font-size: 0.9rem;
  transition: border-color 0.15s, background 0.15s;
}

.builder-block__image-placeholder:hover {
  border-color: #6366f1;
  background: #f5f3ff;
}

.builder-block__image-icon {
  font-size: 2rem;
}

.builder-block__image-hint {
  font-size: 0.75rem;
  color: #9ca3af;
}

.builder-block__image-preview {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.builder-block__image-preview img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.builder-block__image-remove {
  align-self: flex-start;
  background: none;
  border: 1px solid #fca5a5;
  color: #dc2626;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  transition: background 0.15s;
}

.builder-block__image-remove:hover {
  background: #fee2e2;
}

.block-list-move {
  transition: transform 0.3s ease;
}

.block-list-enter-active,
.block-list-leave-active {
  transition: all 0.25s ease;
}

.block-list-enter-from,
.block-list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>