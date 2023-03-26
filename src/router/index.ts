import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import FilmInfo from '@/views/FilmInfo.vue'
import Saved from '@/views/Saved.vue'

const routes = [
    {
        path: '/imdb_academy/',
        component: Home
    },
    
    {
        path: '/imdb_academy/filminfo',
        component: FilmInfo
    },
    {
        path: '/imdb_academy/saved',
        component: Saved
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
