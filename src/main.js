import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useShoppingStore } from '@/stores'
import './style.css'


createApp(App).use(createPinia()).use(router).mount('#app')

const cart = JSON.parse(localStorage.getItem("cart"))
const shopData = useShoppingStore()

if(cart){
    shopData.setCartFromLocalStorage(cart)
}
