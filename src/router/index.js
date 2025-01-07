import { createRouter, createWebHistory } from 'vue-router'

import DetailedBlog from '@/components/DetailedBlog.vue'
import HomeView from '@/views/HomeView.vue'
import AddBlog from '@/components/AddBlog.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/blog/:id',
      name: 'Blog',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: DetailedBlog,
    },
    {
      path: '/add-blog',
      name: 'Add Blog',
      component: AddBlog,
      props: true,
    },
  ],
})

export default router
