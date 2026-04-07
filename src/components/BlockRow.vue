<template>
  <div class="block-row">
    <span class="block-row__num">{{ index + 1 }}</span>

    <input
      class="field__input field__input--flex"
      type="text"
      :value="block.label"
      placeholder="Название блока, например: Заголовок"
      @input="handleLabelChange"
    />

    <select
      class="field__input block-row__type"
      :value="block.type"
      @change="handleTypeChange"
    >
      <option value="text">Текст</option>
      <option value="image">Изображение</option>
    </select>

    <div class="block-row__btns">
      <button
        class="icon-btn"
        title="Вверх"
        :disabled="isFirst"
        @click="$emit('moveUp')"
      >▲</button>
      <button
        class="icon-btn"
        title="Вниз"
        :disabled="isLast"
        @click="$emit('moveDown')"
      >▼</button>
      <button
        class="icon-btn icon-btn--danger"
        title="Удалить"
        @click="$emit('remove')"
      >✕</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Block } from '../types'

const props = defineProps<{
  block: Block
  index: number
  isFirst: boolean
  isLast: boolean
}>()

const emit = defineEmits<{
  'update:label': [label: string]
  'update:type': [type: 'text' | 'image']
  'moveUp': []
  'moveDown': []
  'remove': []
}>()

function handleLabelChange(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:label', value)
}

function handleTypeChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value as 'text' | 'image'
  emit('update:type', value)
}
</script>

<style scoped>
.block-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%; /* Добавляем ширину 100% */
  min-width: 0; /* Важно для flex-детей, чтобы они могли сжиматься */
}

.block-row__num {
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

.block-row__type {
  width: 140px;
  flex-shrink: 0;
}

.block-row__btns {
  display: flex;
  gap: 0.3rem;
  flex-shrink: 0;
}

.field__input {
  padding: 0.65rem 0.9rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  background: #fff;
  color: #111827;
}

/* Специальный класс для input, который должен растягиваться */
.field__input--flex {
  width: 100%;
  min-width: 0; /* Позволяет input сжиматься при необходимости */
  flex: 1; /* Занимает всё доступное место */
}

.field__input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
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
  cursor: pointer;
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
</style>