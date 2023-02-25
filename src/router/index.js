import { createRouter, createWebHashHistory } from 'vue-router'
import mainView from '../views/mainView.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: mainView,
    meta: {
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
