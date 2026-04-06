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
}

.header__logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: #6366f1;
  text-decoration: none;
  letter-spacing: -0.5px;
}

.header__link {
  color: #374151;
  text-decoration: none;
  font-size: 0.95rem;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  transition: background 0.15s;
}

.header__link:hover,
.header__link.router-link-active {
  background: #f3f4f6;
  color: #6366f1;
}
</style>