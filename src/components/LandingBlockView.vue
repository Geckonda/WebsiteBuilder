<template>
  <div class="landing-block">
    <span class="landing-block__label">{{ block.label }}</span>
    <div class="landing-block__value">
      <template v-if="block.type === 'image'">
        <img
          v-if="block.value"
          :src="block.value"
          :alt="block.label"
          class="landing-block__img"
        />
        <span v-else class="landing-block__empty">Изображение не загружено</span>
      </template>
      <span v-else-if="block.value" class="landing-block__text">
        {{ block.value }}
      </span>
      <span v-else class="landing-block__empty">Не заполнено</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Block } from '../types'

defineProps<{
  block: Block
}>()
</script>

<style scoped>
.landing-block {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.landing-block__label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #9ca3af;
}

.landing-block__text {
  font-size: 0.95rem;
  color: #111827;
  white-space: pre-wrap;
  line-height: 1.6;
}

.landing-block__img {
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.landing-block__empty {
  font-size: 0.875rem;
  color: #d1d5db;
  font-style: italic;
}
</style>