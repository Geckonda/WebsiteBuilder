import { createRouter, createWebHistory } from 'vue-router'
import TemplatesPage from '../pages/TemplatesPage.vue'
import TemplatePage from '../pages/TemplatePage.vue'
import BuilderPage from '../pages/BuilderPage.vue'
import LandingsPage from '../pages/LandingsPage.vue'
import CreateTemplatePage from '../pages/CreateTemplatePage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/templates' },
    {
      path: '/templates',
      name: 'templates',
      component: TemplatesPage,
      meta: { title: 'Шаблоны — WebsiteBuilder' }
    },
    {
      path: '/templates/create',
      name: 'create-template',
      component: CreateTemplatePage,
      meta: { title: 'Новый шаблон — WebsiteBuilder' }
    },
    {
      path: '/templates/:id',
      name: 'template',
      component: TemplatePage,
      meta: { title: 'Шаблон — WebsiteBuilder' }
    },
    {
      path: '/builder/:id',
      name: 'builder',
      component: BuilderPage,
      meta: { title: 'Конструктор — WebsiteBuilder' }
    },
    {
      path: '/landings',
      name: 'landings',
      component: LandingsPage,
      meta: { title: 'Мои лендинги — WebsiteBuilder' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage,
      meta: { title: '404 — WebsiteBuilder' }
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  document.title = (to.meta.title as string) ?? 'WebsiteBuilder'
})

export default router