<template>
  <div>
    <button class="back-btn" @click="router.back()">← Назад</button>

    <LoadingSpinner v-if="loading" text="Загружаем шаблон..." />

    <ErrorMessage
      v-else-if="error"
      :message="error"
      :on-retry="load"
    />

    <template v-else-if="template">
      <TemplateHero :template="template" />
      <TemplateBlocksList :blocks="template.blocks" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../api'
import type { Template } from '../types'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ErrorMessage from '../components/ErrorMessage.vue'
import TemplateHero from '../components/TemplateHero.vue'
import TemplateBlocksList from '../components/TemplateBlocksList.vue'

const route = useRoute()
const router = useRouter()

const template = ref<Template | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    template.value = await api.getTemplate(route.params.id as string)
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<style scoped>
.back-btn {
  background: none;
  border: none;
  color: #6366f1;
  font-size: 0.95rem;
  padding: 0;
  margin-bottom: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  transition: opacity 0.15s;
}

.back-btn:hover {
  opacity: 0.7;
}
</style>