import { createRouter, createWebHistory } from 'vue-router'
import { useCurrentUserStore } from '@/stores/user.store'
import { useTaskStore } from '@/stores/task.store'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AppView',
      component: () => import('../views/AppView.vue'),
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: () => import("../components/AppDashboard.vue"),
        },
      ]
    },

  ]
})

router.beforeEach(async (to, from, next) => {
  const currentUserStore = useCurrentUserStore()
  const taskStore = useTaskStore()

  await currentUserStore.fetchCurrentUser()
  await taskStore.fetchTasks()

  next()
})

export default router
