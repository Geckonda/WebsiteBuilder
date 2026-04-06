<template>
  <div>
    <button class="back-btn" @click="router.back()">← Назад</button>
    <h1 class="page-title">Новый шаблон</h1>

    <div class="form-card">
      <!-- Основная информация -->
      <section class="form-section">
        <h2 class="form-section__title">Основная информация</h2>

        <div class="field">
          <label class="field__label">Название шаблона *</label>
          <input
            v-model="form.name"
            class="field__input"
            :class="{ 'field__input--error': errors.name }"
            type="text"
            placeholder="Например: Landing Pro"
          />
          <span v-if="errors.name" class="field__error">{{ errors.name }}</span>
        </div>

        <div class="field">
          <label class="field__label">Описание *</label>
          <textarea
            v-model="form.description"
            class="field__textarea"
            :class="{ 'field__input--error': errors.description }"
            placeholder="Для чего подходит этот шаблон?"
            rows="3"
          />
          <span v-if="errors.description" class="field__error">{{ errors.description }}</span>
        </div>

        <div class="field-row">
          <div class="field">
            <label class="field__label">Автор *</label>
            <input
              v-model="form.author"
              class="field__input"
              :class="{ 'field__input--error': errors.author }"
              type="text"
              placeholder="Ваше имя"
            />
            <span v-if="errors.author" class="field__error">{{ errors.author }}</span>
          </div>

          <div class="field">
            <label class="field__label">Лицензия</label>
            <select v-model="form.license" class="field__input">
              <option>MIT</option>
              <option>CC BY 4.0</option>
              <option>Платная</option>
              <option>Проприетарная</option>
            </select>
          </div>

          <div class="field">
            <label class="field__label">Цена (₽)</label>
            <input
              v-model.number="form.price"
              class="field__input"
              type="number"
              min="0"
              placeholder="0 — бесплатно"
            />
          </div>
        </div>

        <div class="field">
          <label class="field__label">Ключевые слова</label>
          <div class="tags-input">
            <span
              v-for="kw in form.keywords"
              :key="kw"
              class="tags-input__tag"
            >
              {{ kw }}
              <button class="tags-input__remove" @click="removeKeyword(kw)">✕</button>
            </span>
            <input
              v-model="keywordInput"
              class="tags-input__input"
              type="text"
              placeholder="Введите и нажмите Enter..."
              @keydown.enter.prevent="addKeyword"
              @keydown.comma.prevent="addKeyword"
            />
          </div>
          <span class="field__hint">Нажмите Enter или запятую для добавления</span>
        </div>

        <div class="field">
          <label class="field__label">URL превью</label>
          <input
            v-model="form.preview"
            class="field__input"
            type="text"
            placeholder="https://placehold.co/600x400/6366f1/ffffff?text=MyTemplate"
          />
        </div>
      </section>

      <!-- Блоки -->
      <section class="form-section">
        <div class="form-section__header">
          <div>
            <h2 class="form-section__title">Блоки шаблона</h2>
            <p class="form-section__hint">Определите, какие блоки будет редактировать пользователь</p>
          </div>
          <button class="add-block-btn" @click="addBlock">+ Добавить блок</button>
        </div>

        <span v-if="errors.blocks" class="field__error">{{ errors.blocks }}</span>

        <div v-if="form.blocks.length === 0" class="blocks-empty">
          Блоков пока нет — добавьте хотя бы один
        </div>

        <div v-else class="blocks-editor">
          <div
            v-for="(block, index) in form.blocks"
            :key="block.id"
            class="block-row"
          >
            <span class="block-row__num">{{ index + 1 }}</span>

            <input
              v-model="block.label"
              class="field__input"
              type="text"
              placeholder="Название блока, например: Заголовок"
            />

            <select v-model="block.type" class="field__input block-row__type">
              <option value="text">Текст</option>
              <option value="image">Изображение</option>
            </select>

            <div class="block-row__btns">
              <button
                class="icon-btn"
                :disabled="index === 0"
                @click="moveBlockUp(index)"
              >▲</button>
              <button
                class="icon-btn"
                :disabled="index === form.blocks.length - 1"
                @click="moveBlockDown(index)"
              >▼</button>
              <button
                class="icon-btn icon-btn--danger"
                @click="removeBlock(index)"
              >✕</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Итог -->
      <div class="form-footer">
        <div v-if="saveError" class="form-footer__error">
          {{ saveError }}
        </div>
        <button
          class="submit-btn"
          :disabled="saving"
          @click="handleSubmit"
        >
          {{ saving ? 'Сохранение...' : 'Создать шаблон' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../api'
import { useTemplatesStore } from '../stores/templates'
import type { Block } from '../types'

const router = useRouter()
const templatesStore = useTemplatesStore()

const saving = ref(false)
const saveError = ref<string | null>(null)
const keywordInput = ref('')

const form = reactive({
  name: '',
  description: '',
  author: '',
  license: 'MIT',
  price: 0,
  preview: '',
  keywords: [] as string[],
  blocks: [] as Block[]
})

const errors = reactive({
  name: '',
  description: '',
  author: '',
  blocks: ''
})

let blockCounter = 0

function addKeyword() {
  const kw = keywordInput.value.trim().replace(/,$/, '')
  if (kw && !form.keywords.includes(kw)) {
    form.keywords.push(kw)
  }
  keywordInput.value = ''
}

function removeKeyword(kw: string) {
  form.keywords = form.keywords.filter(k => k !== kw)
}

function addBlock() {
  blockCounter++
  form.blocks.push({
    id: `new-${blockCounter}`,
    type: 'text',
    label: '',
    value: ''
  })
}

function removeBlock(index: number) {
  form.blocks.splice(index, 1)
}

function moveBlockUp(index: number) {
  if (index === 0) return
  ;[form.blocks[index - 1], form.blocks[index]] = [form.blocks[index], form.blocks[index - 1]]
}

function moveBlockDown(index: number) {
  if (index === form.blocks.length - 1) return
  ;[form.blocks[index], form.blocks[index + 1]] = [form.blocks[index + 1], form.blocks[index]]
}

function validate(): boolean {
  errors.name = form.name.trim() ? '' : 'Введите название шаблона'
  errors.description = form.description.trim() ? '' : 'Введите описание'
  errors.author = form.author.trim() ? '' : 'Введите автора'
  errors.blocks = form.blocks.length > 0 ? '' : 'Добавьте хотя бы один блок'
  return !errors.name && !errors.description && !errors.author && !errors.blocks
}

async function handleSubmit() {
  if (!validate()) return

  saving.value = true
  saveError.value = null
  try {
    const preview = form.preview.trim() ||
      `https://placehold.co/600x400/6366f1/ffffff?text=${encodeURIComponent(form.name)}`

    await api.createTemplate({
      name: form.name.trim(),
      description: form.description.trim(),
      author: form.author.trim(),
      license: form.license,
      price: form.price,
      preview,
      keywords: form.keywords,
      blocks: form.blocks.map((b, i) => ({
        ...b,
        id: `b${i + 1}`,
        label: b.label.trim() || `Блок ${i + 1}`
      }))
    })

    templatesStore.templates = []
    router.push('/templates')
  } catch (e: any) {
    saveError.value = e.message
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.back-btn {
  background: none;
  border: none;
  color: #6366f1;
  font-size: 0.95rem;
  padding: 0;
  margin-bottom: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  transition: opacity 0.15s;
}

.back-btn:hover { opacity: 0.7; }

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #111827;
}

.form-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
}

.form-section {
  padding: 1.75rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-section__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.form-section__title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
}

.form-section__hint {
  font-size: 0.85rem;
  color: #6b7280;
  margin-top: 0.2rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
}

.field-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.field__label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.field__input {
  padding: 0.65rem 0.9rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  background: #fff;
  color: #111827;
  width: 100%;
}

.field__input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.field__input--error {
  border-color: #f87171;
}

.field__textarea {
  padding: 0.65rem 0.9rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  resize: vertical;
  transition: border-color 0.15s, box-shadow 0.15s;
  width: 100%;
  color: #111827;
}

.field__textarea:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.field__error {
  font-size: 0.8rem;
  color: #dc2626;
}

.field__hint {
  font-size: 0.78rem;
  color: #9ca3af;
}

.tags-input {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #fff;
  min-height: 42px;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.tags-input:focus-within {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.tags-input__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: #ede9fe;
  color: #5b21b6;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
}

.tags-input__remove {
  background: none;
  border: none;
  color: #7c3aed;
  font-size: 0.7rem;
  padding: 0;
  line-height: 1;
  display: flex;
  align-items: center;
}

.tags-input__input {
  border: none;
  outline: none;
  font-size: 0.9rem;
  flex: 1;
  min-width: 140px;
  color: #111827;
}

.add-block-btn {
  background: #ede9fe;
  color: #5b21b6;
  border: none;
  padding: 0.6rem 1.1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  white-space: nowrap;
  transition: background 0.15s;
}

.add-block-btn:hover {
  background: #ddd6fe;
}

.blocks-empty {
  text-align: center;
  padding: 2rem;
  border: 2px dashed #e5e7eb;
  border-radius: 10px;
  color: #9ca3af;
  font-size: 0.9rem;
}

.blocks-editor {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.block-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.block-row__num {
  width: 26px;
  height: 26px;
  background: #6366f1;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.block-row__type {
  width: 140px;
  flex-shrink: 0;
}

.block-row__btns {
  display: flex;
  gap: 0.3rem;
  flex-shrink: 0;
}

.icon-btn {
  width: 30px;
  height: 30px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.7rem;
  color: #374151;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}

.icon-btn:hover:not(:disabled) { background: #e5e7eb; }
.icon-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.icon-btn--danger:hover:not(:disabled) {
  background: #fee2e2;
  border-color: #fca5a5;
  color: #dc2626;
}

.form-footer {
  padding: 1.5rem 1.75rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
}

.form-footer__error {
  flex: 1;
  font-size: 0.875rem;
  color: #dc2626;
  background: #fef2f2;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid #fecaca;
}

.submit-btn {
  background: #6366f1;
  color: #fff;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  transition: background 0.15s, opacity 0.15s;
}

.submit-btn:hover:not(:disabled) { background: #4f46e5; }
.submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
</style>