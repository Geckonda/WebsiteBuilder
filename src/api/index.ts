import type { Template, Landing } from '../types'

const BASE_URL = 'http://localhost:3001'

export const api = {
  async getTemplates(): Promise<Template[]> {
    const res = await fetch(`${BASE_URL}/templates`)
    if (!res.ok) throw new Error('Не удалось загрузить шаблоны')
    return res.json()
  },

  async getTemplate(id: string): Promise<Template> {
    const res = await fetch(`${BASE_URL}/templates/${id}`)
    if (!res.ok) throw new Error('Шаблон не найден')
    return res.json()
  },

  async saveLanding(landing: Landing): Promise<Landing> {
    const res = await fetch(`${BASE_URL}/landings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(landing)
    })
    if (!res.ok) throw new Error('Не удалось сохранить лендинг')
    return res.json()
  }
}