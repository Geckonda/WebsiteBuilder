import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../api'
import type { Block, Landing } from '../types'

export const useBuilderStore = defineStore('builder', () => {
  const blocks = ref<Block[]>([])
  const templateId = ref('')
  const templateName = ref('')
  const saving = ref(false)
  const saveError = ref<string | null>(null)
  const saveSuccess = ref(false)

  function loadTemplate(id: string, name: string, sourceBlocks: Block[]) {
    templateId.value = id
    templateName.value = name
    blocks.value = sourceBlocks.map(b => ({ ...b, value: '' }))
    saveSuccess.value = false
    saveError.value = null
  }

  function updateBlock(id: string, value: string) {
    const block = blocks.value.find(b => b.id === id)
    if (block) block.value = value
  }

  function moveUp(index: number) {
    if (index === 0) return
    const arr = [...blocks.value]
    ;[arr[index - 1], arr[index]] = [arr[index], arr[index - 1]]
    blocks.value = arr
  }

  function moveDown(index: number) {
    if (index === blocks.value.length - 1) return
    const arr = [...blocks.value]
    ;[arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]
    blocks.value = arr
  }

  function removeBlock(id: string) {
    blocks.value = blocks.value.filter(b => b.id !== id)
  }

  async function save() {
    saving.value = true
    saveError.value = null
    saveSuccess.value = false
    try {
      const landing: Landing = {
        templateId: templateId.value,
        templateName: templateName.value,
        createdAt: new Date().toISOString(),
        blocks: blocks.value
      }
      await api.saveLanding(landing)
      saveSuccess.value = true
    } catch (e: any) {
      saveError.value = e.message
    } finally {
      saving.value = false
    }
  }

  return {
    blocks, templateId, templateName,
    saving, saveError, saveSuccess,
    loadTemplate, updateBlock, moveUp, moveDown, removeBlock, save
  }
})