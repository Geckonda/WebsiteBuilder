<template>
  <div>
    <h1 class="page-title">Шаблоны сайтов</h1>

    <SearchFilter
      v-model="store.search"
      :count="store.filtered.length"
    />

    <LoadingSpinner v-if="store.loading" text="Загружаем шаблоны..." />

    <ErrorMessage
      v-else-if="store.error"
      :message="store.error"
      :on-retry="store.fetchTemplates"
    />

    <template v-else>
      <div v-if="store.filtered.length === 0" class="empty">
        По запросу «{{ store.search }}» ничего не найдено
      </div>

      <div v-else class="grid">
        <TemplateCard
          v-for="t in store.filtered"
          :key="t.id"
          :template="t"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTemplatesStore } from '../stores/templates'
import SearchFilter from '../components/SearchFilter.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ErrorMessage from '../components/ErrorMessage.vue'
import TemplateCard from '../components/TemplateCard.vue'

const store = useTemplatesStore()

onMounted(() => {
  if (store.templates.length === 0) {
    store.fetchTemplates()
  }
})
</script>

<style scoped>
.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #111827;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.empty {
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
  font-size: 1rem;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}
</style>