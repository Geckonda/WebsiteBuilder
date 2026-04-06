<template>
  <div class="error">
    <span class="error__icon">!</span>
    <div>
      <p class="error__title">Произошла ошибка</p>
      <p class="error__text">{{ message }}</p>
    </div>
    <button v-if="onRetry" class="error__btn" @click="onRetry">
      Повторить
    </button>
  </div>
</template>

<script setup lang="ts">
    defineProps<{
    message: string
    onRetry?: () => void
    }>()
</script>

<style scoped>
    .error {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 10px;
    padding: 1.25rem 1.5rem;
    margin: 2rem 0;
    }

    .error__icon {
    width: 36px;
    height: 36px;
    background: #ef4444;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.1rem;
    flex-shrink: 0;
    }

    .error__title {
    font-weight: 600;
    color: #991b1b;
    margin-bottom: 0.2rem;
    }

    .error__text {
    color: #b91c1c;
    font-size: 0.9rem;
    }

    .error__btn {
    margin-left: auto;
    padding: 0.5rem 1rem;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 0.9rem;
    white-space: nowrap;
    transition: background 0.15s;
    }

    .error__btn:hover {
    background: #dc2626;
    }
</style>