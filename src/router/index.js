import { createRouter, createWebHistory } from 'vue-router'
import UserList from '../components/userList.vue'
import UserProfie from '../components/userProfile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'userlist',
      component: UserList
    },
    {
      path: '/userprofile',
      name: 'userprofile',
      component: UserProfie
    }
  ]
})

export default router
