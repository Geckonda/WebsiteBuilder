export interface Block {
  id: string
  type: 'text' | 'image'
  label: string
  value: string
}

export interface Template {
  id: string
  name: string
  keywords: string[]
  description: string
  author: string
  license: string
  price: number
  preview: string
  blocks: Block[]
}

export interface Landing {
  id?: string
  templateId: string
  templateName: string
  createdAt: string
  blocks: Block[]
}