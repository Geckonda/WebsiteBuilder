<template>
  <div class="landing-card">
    <div class="landing-card__header">
      <div>
        <h3 class="landing-card__title">{{ landing.templateName }}</h3>
        <p class="landing-card__date">
          Создан: {{ formatDate(landing.createdAt) }}
        </p>
      </div>
      <button
        class="landing-card__delete"
        title="Удалить лендинг"
        @click="$emit('delete', landing.id!)"
      >
        ✕
      </button>
    </div>

    <div class="landing-card__blocks">
      <LandingBlockView
        v-for="block in landing.blocks"
        :key="block.id"
        :block="block"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Landing } from '../types'
import LandingBlockView from './LandingBlockView.vue'

defineProps<{
  landing: Landing
}>()

defineEmits<{
  delete: [id: string]
}>()

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.landing-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  overflow: hidden;
}

.landing-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.landing-card__title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #111827;
}

.landing-card__date {
  font-size: 0.8rem;
  color: #9ca3af;
  margin-top: 0.25rem;
}

.landing-card__delete {
  background: none;
  border: 1px solid #fca5a5;
  color: #dc2626;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  flex-shrink: 0;
  cursor: pointer;
}

.landing-card__delete:hover {
  background: #fee2e2;
}

.landing-card__blocks {
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>