<template>
  <div class="blocks-section">
    <h2 class="blocks-section__title">Блоки шаблона</h2>
    <p class="blocks-section__hint">
      В конструкторе вы сможете заполнить каждый блок своим содержимым
    </p>
    <div class="blocks-list">
      <div
        v-for="(block, index) in blocks"
        :key="block.id"
        class="block-item"
      >
        <span class="block-item__num">{{ index + 1 }}</span>
        <div class="block-item__info">
          <span class="block-item__label">{{ block.label }}</span>
          <span
            class="block-item__type"
            :class="`block-item__type--${block.type}`"
          >
            {{ block.type === 'text' ? 'Текст' : 'Изображение' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Block } from '../types'

defineProps<{
  blocks: Block[]
}>()
</script>

<style scoped>
.blocks-section__title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
}

.blocks-section__hint {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1.25rem;
}

.blocks-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.block-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.block-item__num {
  width: 28px;
  height: 28px;
  background: #6366f1;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  flex-shrink: 0;
}

.block-item__info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
}

.block-item__label {
  font-size: 0.95rem;
  color: #111827;
}

.block-item__type {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
}

.block-item__type--text {
  background: #ede9fe;
  color: #5b21b6;
}

.block-item__type--image {
  background: #fef3c7;
  color: #92400e;
}
</style>