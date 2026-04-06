<template>
  <div class="spinner-wrap">
    <div class="spinner"></div>
    <p class="spinner__text">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
    withDefaults(defineProps<{ text?: string }>(), {
    text: 'Загрузка...'
    })
</script>

<style scoped>
    .spinner-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 3rem;
    }

    .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e5e7eb;
    border-top-color: #6366f1;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    }

    .spinner__text {
    color: #6b7280;
    font-size: 0.9rem;
    }

    @keyframes spin {
    to { transform: rotate(360deg); }
    }
</style>