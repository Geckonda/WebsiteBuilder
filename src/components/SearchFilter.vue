<template>
  <div class="search">
    <div class="search__field">
      <span class="search__icon">🔍</span>
      <input
        class="search__input"
        type="text"
        :value="modelValue"
        placeholder="Поиск по названию или ключевым словам..."
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <button
        v-if="modelValue"
        class="search__clear"
        @click="$emit('update:modelValue', '')"
      >
        ✕
      </button>
    </div>
    <p class="search__hint">Найдено: {{ count }}</p>
  </div>
</template>

<script setup lang="ts">
    defineProps<{
    modelValue: string
    count: number
    }>()

    defineEmits<{
    'update:modelValue': [value: string]
    }>()
</script>

<style scoped>
    .search {
    margin-bottom: 2rem;
    }

    .search__field {
    position: relative;
    display: flex;
    align-items: center;
    }

    .search__icon {
    position: absolute;
    left: 1rem;
    font-size: 1rem;
    pointer-events: none;
    }

    .search__input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.75rem;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    font-size: 1rem;
    outline: none;
    background: #fff;
    transition: border-color 0.15s, box-shadow 0.15s;
    }

    .search__input:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
    }

    .search__clear {
    position: absolute;
    right: 1rem;
    background: none;
    border: none;
    color: #9ca3af;
    font-size: 1rem;
    padding: 0.25rem;
    line-height: 1;
    transition: color 0.15s;
    }

    .search__clear:hover {
    color: #374151;
    }

    .search__hint {
    margin-top: 0.5rem;
    font-size: 0.85rem;
    color: #6b7280;
    }
</style>