import IndexView from '@/views/IndexView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/todo',
      name: 'todo',
      component: IndexView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }  
  ]
})

export default router
