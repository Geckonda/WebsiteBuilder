<template>
  <div class="blocks-editor-wrap">
    <div class="blocks-editor__header">
      <div>
        <h2 class="blocks-editor__title">Блоки шаблона</h2>
        <p class="blocks-editor__hint">
          Определите, какие блоки будет редактировать пользователь
        </p>
      </div>
      <button class="add-btn" @click="addBlock">+ Добавить блок</button>
    </div>

    <span v-if="error" class="blocks-editor__error">{{ error }}</span>

    <div v-if="modelValue.length === 0" class="blocks-editor__empty">
      Блоков пока нет — добавьте хотя бы один
    </div>

    <div v-else class="blocks-list">
      <BlockRow
        v-for="(block, index) in modelValue"
        :key="block.id"
        :block="block"
        :index="index"
        :is-first="index === 0"
        :is-last="index === modelValue.length - 1"
        @update:label="(label) => updateLabel(index, label)"
        @update:type="(type) => updateType(index, type)"
        @move-up="moveUp(index)"
        @move-down="moveDown(index)"
        @remove="removeBlock(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Block } from '../types'
import BlockRow from './BlockRow.vue'

const props = defineProps<{
  modelValue: Block[]
  error?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [blocks: Block[]]
}>()

let counter = 0

function addBlock() {
  counter++
  emit('update:modelValue', [
    ...props.modelValue,
    { id: `new-${counter}`, type: 'text', label: '', value: '' }
  ])
}

function removeBlock(index: number) {
  const updated = props.modelValue.filter((_, i) => i !== index)
  emit('update:modelValue', updated)
}

function updateLabel(index: number, label: string) {
  const updated = props.modelValue.map((b, i) =>
    i === index ? { ...b, label } : b
  )
  emit('update:modelValue', updated)
}

function updateType(index: number, type: 'text' | 'image') {
  const updated = props.modelValue.map((b, i) =>
    i === index ? { ...b, type } : b
  )
  emit('update:modelValue', updated)
}

function moveUp(index: number) {
  if (index === 0) return
  const updated = [...props.modelValue]
  ;[updated[index - 1], updated[index]] = [updated[index], updated[index - 1]]
  emit('update:modelValue', updated)
}

function moveDown(index: number) {
  if (index === props.modelValue.length - 1) return
  const updated = [...props.modelValue]
  ;[updated[index], updated[index + 1]] = [updated[index + 1], updated[index]]
  emit('update:modelValue', updated)
}
</script>

<style scoped>
.blocks-editor-wrap {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.blocks-editor__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.blocks-editor__title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
}

.blocks-editor__hint {
  font-size: 0.85rem;
  color: #6b7280;
  margin-top: 0.2rem;
}

.blocks-editor__error {
  font-size: 0.8rem;
  color: #dc2626;
}

.blocks-editor__empty {
  text-align: center;
  padding: 2rem;
  border: 2px dashed #e5e7eb;
  border-radius: 10px;
  color: #9ca3af;
  font-size: 0.9rem;
}

.add-btn {
  background: #ede9fe;
  color: #5b21b6;
  border: none;
  padding: 0.6rem 1.1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  white-space: nowrap;
  transition: background 0.15s;
  cursor: pointer;
}

.add-btn:hover {
  background: #ddd6fe;
}

.blocks-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>