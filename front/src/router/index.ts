import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import FilmInfo from '@/views/FilmInfo.vue'
import Saved from '@/views/Saved.vue'

import type { Film } from '@/types'

const routes = [
    {
        path: '/imdb_academy/',
        component: Home
    },
    {
        path: '/imdb_academy/filminfo/:id',
        component: FilmInfo,
        props: true
        //props: (route: { query: { film: Film } }) => ({ film: route.query.film })
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
