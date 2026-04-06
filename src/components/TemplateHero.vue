<template>
  <div class="hero">
    <img :src="template.preview" :alt="template.name" class="hero__img" />
    <div class="hero__body">
      <div class="hero__top">
        <h1 class="hero__title">{{ template.name }}</h1>
        <span
          class="hero__price"
          :class="{ 'hero__price--free': template.price === 0 }"
        >
          {{ template.price === 0 ? 'Бесплатно' : `${template.price} ₽` }}
        </span>
      </div>

      <p class="hero__desc">{{ template.description }}</p>

      <TemplateMeta
        :author="template.author"
        :license="template.license"
        :blocks-count="template.blocks.length"
      />

      <div class="hero__keywords">
        <span
          v-for="kw in template.keywords"
          :key="kw"
          class="tag"
        >
          {{ kw }}
        </span>
      </div>

      <RouterLink :to="`/builder/${template.id}`" class="cta-btn">
        Создать лендинг по этому шаблону →
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Template } from '../types'
import TemplateMeta from './TemplateMeta.vue'

defineProps<{
  template: Template
}>()
</script>

<style scoped>
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

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .hero__body {
    padding: 1.5rem;
  }
}
</style>