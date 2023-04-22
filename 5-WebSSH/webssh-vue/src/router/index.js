import { createRouter, createWebHistory } from 'vue-router'
import WebShell from '../views/WebShell.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'WebShell',
      component: WebShell
    }
  ]
})

export default router
