<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Сохранённые лендинги</h1>
      <RouterLink to="/templates" class="page-header__btn">
        + Создать новый
      </RouterLink>
    </div>

    <LoadingSpinner v-if="loading" text="Загружаем лендинги..." />

    <ErrorMessage
      v-else-if="error"
      :message="error"
      :on-retry="load"
    />

    <template v-else>
      <div v-if="landings.length === 0" class="empty">
        <div class="empty__icon">📄</div>
        <p class="empty__title">Лендингов пока нет</p>
        <p class="empty__text">Выберите шаблон и создайте первый лендинг</p>
        <RouterLink to="/templates" class="empty__btn">
          Перейти к шаблонам
        </RouterLink>
      </div>

      <div v-else class="landings-list">
        <LandingCard
          v-for="landing in landings"
          :key="landing.id"
          :landing="landing"
          @delete="handleDelete"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '../api'
import type { Landing } from '../types'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ErrorMessage from '../components/ErrorMessage.vue'
import LandingCard from '../components/LandingCard.vue'

const landings = ref<Landing[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    landings.value = await api.getLandings()
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

async function handleDelete(id: string) {
  if (!confirm('Удалить этот лендинг?')) return
  try {
    await api.deleteLanding(id)
    landings.value = landings.value.filter(l => l.id !== id)
  } catch (e: any) {
    alert('Не удалось удалить: ' + e.message)
  }
}

onMounted(load)
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
}

.page-header__btn {
  background: #6366f1;
  color: #fff;
  text-decoration: none;
  padding: 0.65rem 1.25rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background 0.15s;
}

.page-header__btn:hover {
  background: #4f46e5;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 5rem 2rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  text-align: center;
}

.empty__icon {
  font-size: 3rem;
}

.empty__title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #111827;
}

.empty__text {
  color: #6b7280;
  font-size: 0.9rem;
}

.empty__btn {
  margin-top: 0.5rem;
  background: #6366f1;
  color: #fff;
  text-decoration: none;
  padding: 0.65rem 1.25rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background 0.15s;
}

.empty__btn:hover {
  background: #4f46e5;
}

.landings-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>