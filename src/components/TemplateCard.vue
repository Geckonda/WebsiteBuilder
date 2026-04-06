<template>
  <RouterLink :to="`/templates/${template.id}`" class="card">
    <div class="card__preview">
      <img :src="template.preview" :alt="template.name" />
    </div>
    <div class="card__body">
      <div class="card__top">
        <h3 class="card__name">{{ template.name }}</h3>
        <span class="card__price" :class="{ 'card__price--free': template.price === 0 }">
          {{ template.price === 0 ? 'Бесплатно' : `${template.price} ₽` }}
        </span>
      </div>
      <p class="card__desc">{{ template.description }}</p>
      <div class="card__keywords">
        <span
          v-for="kw in template.keywords"
          :key="kw"
          class="card__tag"
        >
          {{ kw }}
        </span>
      </div>
      <p class="card__author">Автор: {{ template.author }}</p>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
    import type { Template } from '../types'

    defineProps<{ template: Template }>()
</script>

<style scoped>
    .card {
    display: flex;
    flex-direction: column;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: box-shadow 0.2s, transform 0.2s;
    }

    .card:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    }

    .card__preview img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
    }

    .card__body {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    flex: 1;
    }

    .card__top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.5rem;
    }

    .card__name {
    font-size: 1.05rem;
    font-weight: 600;
    color: #111827;
    }

    .card__price {
    font-size: 0.85rem;
    font-weight: 600;
    background: #fef3c7;
    color: #92400e;
    padding: 0.2rem 0.6rem;
    border-radius: 20px;
    white-space: nowrap;
    }

    .card__price--free {
    background: #d1fae5;
    color: #065f46;
    }

    .card__desc {
    font-size: 0.875rem;
    color: #6b7280;
    line-height: 1.5;
    }

    .card__keywords {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    }

    .card__tag {
    font-size: 0.75rem;
    background: #f3f4f6;
    color: #374151;
    padding: 0.2rem 0.6rem;
    border-radius: 20px;
    }

    .card__author {
    font-size: 0.8rem;
    color: #9ca3af;
    margin-top: auto;
    }
</style>