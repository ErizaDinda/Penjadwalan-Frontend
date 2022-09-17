//import vue router
import { createRouter, createWebHistory } from 'vue-router'
 
//define a routes
const routes = [
    {
        path: '/index',
        name: 'post.index',
        component: () => import( /* webpackChunkName: "post.index" */ '@/views/post/Index.vue')
    },
    {
        path: '/jadwal',
        name: 'post.jadwal',
        component: () => import( /* webpackChunkName: "post.index" */ '@/views/jadwal/Index.vue')
    },
    {
        path: '/jadwal',
        name: 'post.index',
        component: () => import( /* webpackChunkName: "post.index" */ '@/views/jadwal/Index1.vue')
    },
    {
        path: '/jadwal',
        name: 'post.dashboard',
        component: () => import( /* webpackChunkName: "post.index" */ '@/views/jadwal/Dashboard.vue')
    },
    {
        path: '/create',
        name: 'post.create',
        component: () => import( /* webpackChunkName: "post.create" */ '@/views/post/Create.vue')
    },
    {
        path: '/edit/:kode',
        name: 'post.edit',
        component: () => import( /* webpackChunkName: "post.edit" */ '@/views/post/Edit.vue')
    },
    {
        path: '/',
        name: 'post.dashboard',
        component: () => import( /* webpackChunkName: "post.dashboard" */ '@/views/post/Dashboard.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import( /* webpackChunkName: "login" */ '@/views/auth/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import( /* webpackChunkName: "register" */ '@/views/auth/Register.vue')
      }
]
 
//create router
const router = createRouter({
    history: createWebHistory(),
    routes  // config routes
})
 
export default router