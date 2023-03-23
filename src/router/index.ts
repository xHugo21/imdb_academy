import {createRouter, createWebHistory} from 'vue-router'

import Home from '@/views/Home.vue'
import FilmInfo from '@/views/FilmInfo.vue'
import Saved from '@/views/Saved.vue'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/filminfo',
        component: FilmInfo
    },
    {
        path: '/saved',
        component: Saved
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

