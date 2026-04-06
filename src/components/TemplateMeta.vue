<template>
  <div class="meta">
    <div class="meta-item">
      <span class="meta-item__label">Автор</span>
      <span class="meta-item__value">{{ author }}</span>
    </div>
    <div class="meta-item">
      <span class="meta-item__label">Лицензия</span>
      <span class="meta-item__value">{{ license }}</span>
    </div>
    <div class="meta-item">
      <span class="meta-item__label">Блоков</span>
      <span class="meta-item__value">{{ blocksCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  author: string
  license: string
  blocksCount: number
}>()
</script>

<style scoped>
.meta {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.meta-item__label {
  font-size: 0.75rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.meta-item__value {
  font-size: 0.95rem;
  font-weight: 600;
  color: #111827;
}
</style>