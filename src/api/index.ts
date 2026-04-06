import type { Template, Landing } from '../types'

const BASE_URL = 'http://localhost:3001'

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Ошибка сервера: ${res.status} ${res.statusText}`)
    return res.json()
  } catch (e: any) {
    if (e instanceof TypeError) {
      throw new Error('Нет соединения с сервером. Убедитесь, что json-server запущен.')
    }
    throw e
  }
}

export const api = {
  getTemplates(): Promise<Template[]> {
    return request(`${BASE_URL}/templates`)
  },

  getTemplate(id: string): Promise<Template> {
    return request(`${BASE_URL}/templates/${id}`)
  },

  createTemplate(template: Omit<Template, 'id'>): Promise<Template> {
    return request(`${BASE_URL}/templates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(template)
    })
  },

  getLandings(): Promise<Landing[]> {
    return request(`${BASE_URL}/landings`)
  },

  deleteLanding(id: string): Promise<void> {
    return request(`${BASE_URL}/landings/${id}`, {
      method: 'DELETE'
    })
  },

  saveLanding(landing: Landing): Promise<Landing> {
    return request(`${BASE_URL}/landings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(landing)
    })
  }
}