import { createRouter, createWebHistory } from 'vue-router'
import TemplatesPage from '../pages/TemplatesPage.vue'
import TemplatePage from '../pages/TemplatePage.vue'
import BuilderPage from '../pages/BuilderPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/templates'
    },
    {
      path: '/templates',
      name: 'templates',
      component: TemplatesPage
    },
    {
      path: '/templates/:id',
      name: 'template',
      component: TemplatePage
    },
    {
      path: '/builder/:id',
      name: 'builder',
      component: BuilderPage
    }
  ]
})

export default router