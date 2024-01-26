import { createRouter, createWebHistory } from 'vue-router'
import WebShell from '../views/WebShell.vue'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'WebShell',
      component: WebShell
    },
    {
      path: "/home",
      name: "Home",
      component: Home
    }
  ]
})

export default router
