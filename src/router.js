import { createRouter, createWebHistory } from 'vue-router'
import About from '@/views/About.vue'
import Home from '@/views/Home.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            component: Home,
            path: '/'
        },
        {
            component: About,
            path: '/about'
        }
    ]
})

export default router