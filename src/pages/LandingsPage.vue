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
        <div
          v-for="landing in landings"
          :key="landing.id"
          class="landing-card"
        >
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
              @click="handleDelete(landing.id!)"
            >
              ✕
            </button>
          </div>

          <div class="landing-card__blocks">
            <div
              v-for="block in landing.blocks"
              :key="block.id"
              class="landing-block"
            >
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
          </div>
        </div>
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

const landings = ref<Landing[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

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