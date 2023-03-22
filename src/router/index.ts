import {createRouter, createWebHistory} from 'vue-router'

import Home from '@/views/Home.vue'
import FilmInfo from '@/views/FilmInfo.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/filminfo',
        name: 'FilmInfo',
        component: FilmInfo
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
