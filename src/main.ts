import { createApp } from 'vue'
//import App from './App.vue'
import Home from './views/Home.vue'
import { router } from './router'
import { store } from './store/store'
import './assets/main.css'


createApp(Home).use(store).use(router).mount('#app')
