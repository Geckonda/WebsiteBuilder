<template>
  <header class="header">
    <div class="header__inner">
      <RouterLink to="/templates" class="header__logo">
        WebsiteBuilder
      </RouterLink>
      <nav class="header__nav">
        <RouterLink to="/templates" class="header__link">
          Шаблоны
        </RouterLink>
        <RouterLink to="/landings" class="header__link">
          Мои лендинги
        </RouterLink>
        <RouterLink to="/templates/create" class="header__link header__link--accent">
          + Новый шаблон
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
.header {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.header__logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: #6366f1;
  text-decoration: none;
  letter-spacing: -0.5px;
  flex-shrink: 0;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.header__link {
  color: #374151;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
}

.header__link:hover,
.header__link.router-link-active {
  background: #f3f4f6;
  color: #6366f1;
}

.header__link--accent {
  background: #ede9fe;
  color: #5b21b6;
  font-weight: 600;
}

.header__link--accent:hover {
  background: #ddd6fe;
  color: #4c1d95;
}
</style>