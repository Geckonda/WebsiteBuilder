import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '../api'
import type { Template } from '../types'

export const useTemplatesStore = defineStore('templates', () => {
  const templates = ref<Template[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const search = ref('')

  const filtered = computed(() => {
    const q = search.value.trim().toLowerCase()
    if (!q) return templates.value
    return templates.value.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.keywords.some(k => k.toLowerCase().includes(q))
    )
  })

  async function fetchTemplates() {
    loading.value = true
    error.value = null
    try {
      templates.value = await api.getTemplates()
    } catch (e: any) {
      error.value = "Не удалось загрузить шаблоны: " + (e.message || 'Unknown error')
    } finally {
      loading.value = false
    }
  }

  return { templates, loading, error, search, filtered, fetchTemplates }
})