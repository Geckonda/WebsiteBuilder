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
      <div class="hero">
        <img :src="template.preview" :alt="template.name" class="hero__img" />
        <div class="hero__body">
          <div class="hero__top">
            <h1 class="hero__title">{{ template.name }}</h1>
            <span class="hero__price" :class="{ 'hero__price--free': template.price === 0 }">
              {{ template.price === 0 ? 'Бесплатно' : `${template.price} ₽` }}
            </span>
          </div>

          <p class="hero__desc">{{ template.description }}</p>

          <div class="hero__meta">
            <div class="meta-item">
              <span class="meta-item__label">Автор</span>
              <span class="meta-item__value">{{ template.author }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-item__label">Лицензия</span>
              <span class="meta-item__value">{{ template.license }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-item__label">Блоков</span>
              <span class="meta-item__value">{{ template.blocks.length }}</span>
            </div>
          </div>

          <div class="hero__keywords">
            <span
              v-for="kw in template.keywords"
              :key="kw"
              class="tag"
            >
              {{ kw }}
            </span>
          </div>

          <RouterLink
            :to="`/builder/${template.id}`"
            class="cta-btn"
          >
            Создать лендинг по этому шаблону →
          </RouterLink>
        </div>
      </div>

      <div class="blocks-section">
        <h2 class="blocks-section__title">Блоки шаблона</h2>
        <p class="blocks-section__hint">
          В конструкторе вы сможете заполнить каждый блок своим содержимым
        </p>
        <div class="blocks-list">
          <div
            v-for="(block, index) in template.blocks"
            :key="block.id"
            class="block-item"
          >
            <span class="block-item__num">{{ index + 1 }}</span>
            <div class="block-item__info">
              <span class="block-item__label">{{ block.label }}</span>
              <span class="block-item__type" :class="`block-item__type--${block.type}`">
                {{ block.type === 'text' ? 'Текст' : 'Изображение' }}
              </span>
            </div>
          </div>
        </div>
      </div>
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

.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  min-height: 300px;
}

.hero__body {
  padding: 2rem 2rem 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.hero__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.hero__title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
}

.hero__price {
  font-size: 0.9rem;
  font-weight: 600;
  background: #fef3c7;
  color: #92400e;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  white-space: nowrap;
}

.hero__price--free {
  background: #d1fae5;
  color: #065f46;
}

.hero__desc {
  color: #4b5563;
  line-height: 1.7;
}

.hero__meta {
  display: flex;
  gap: 1.5rem;
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

.hero__keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  font-size: 0.8rem;
  background: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.7rem;
  border-radius: 20px;
}

.cta-btn {
  display: inline-block;
  background: #6366f1;
  color: #fff;
  text-decoration: none;
  padding: 0.85rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  text-align: center;
  transition: background 0.15s, transform 0.15s;
  margin-top: auto;
}

.cta-btn:hover {
  background: #4f46e5;
  transform: translateY(-1px);
}

.blocks-section {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.75rem;
}

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

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .hero__body {
    padding: 1.5rem;
  }

  .hero__meta {
    flex-wrap: wrap;
    gap: 1rem;
  }
}
</style>