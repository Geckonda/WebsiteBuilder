<template>
  <div>
    <button class="back-btn" @click="router.back()">← Назад к шаблону</button>

    <LoadingSpinner v-if="loading" text="Загружаем шаблон..." />

    <ErrorMessage
      v-else-if="error"
      :message="error"
      :on-retry="load"
    />

    <LandingBuilder v-else-if="ready" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../api'
import { useBuilderStore } from '../stores/builder'
import LandingBuilder from '../widgets/LandingBuilder.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

const route = useRoute()
const router = useRouter()
const store = useBuilderStore()

const loading = ref(false)
const error = ref<string | null>(null)
const ready = ref(false)

async function load() {
  loading.value = true
  error.value = null
  ready.value = false
  try {
    const template = await api.getTemplate(route.params.id as string)
    store.loadTemplate(template.id, template.name, template.blocks)
    ready.value = true
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