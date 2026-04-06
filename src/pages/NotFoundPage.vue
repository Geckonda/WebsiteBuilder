<template>
  <div class="not-found">
    <div class="not-found__code">404</div>
    <h1 class="not-found__title">Страница не найдена</h1>
    <p class="not-found__text">
      Возможно, шаблон был удалён или ссылка устарела.
    </p>
    <RouterLink to="/templates" class="not-found__btn">
      Вернуться к шаблонам
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
    .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 5rem 2rem;
    gap: 1rem;
    }

    .not-found__code {
    font-size: 6rem;
    font-weight: 800;
    color: #e5e7eb;
    line-height: 1;
    }

    .not-found__title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    }

    .not-found__text {
    color: #6b7280;
    max-width: 360px;
    }

    .not-found__btn {
    display: inline-block;
    margin-top: 1rem;
    background: #6366f1;
    color: #fff;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    border-radius: 10px;
    font-weight: 600;
    transition: background 0.15s;
    }

    .not-found__btn:hover {
    background: #4f46e5;
    }
</style>