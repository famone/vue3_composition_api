import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import { useShoppingStore } from '@/stores'

createApp(App)
    .use(createPinia())
    .mount('#app')

const cart = JSON.parse(localStorage.getItem("cart"))
const shopData = useShoppingStore()

if(cart){
    shopData.setCartFromLocalStorage(cart)
}
