<template>
    <header class="sticky top-0 bg-white shadow-lg z-50">
        <div class="flex py-5 px-8 justify-between">
            <div class="flex">
                <img src="../assets/logo.svg" class="mr-2">
                <input type="text" placeholder="Search items, collections, and accounts"
                class="block w-96 px-5 rounded-full bg-gray-100 border focus:outline-none focus:border-purple-600 transition duration-150 ease-in-out">
            </div>
            <div class="flex items-center">
                <p v-if="state.currencies" class="mr-4 font-medium">
                    🇺🇸 {{state.currencies.Valute.USD.CharCode}} - 
                    <span class="text-green-600"> {{state.currencies.Valute.USD.Value}} ₽</span>
                </p>
                <button class="inline-block px-6 py-3 bg-purple-600 text-white font-medium text-xs uppercase rounded-full hover:bg-purple-500 transition duration-300 ease-in-out" @click="changeCartVisibility">
                    <i class="fa-solid fa-bag-shopping mr-1"></i>
                    shop cart {{data.getCartItems.length}}
                </button>
            </div>
        </div>
        <CartSidebar v-if="showCart" />
    </header>
</template>

<script setup>
import {ref, reactive} from 'vue'
import { useShoppingStore } from '../stores'
import CartSidebar from './CartSidebar.vue'
import axios from 'axios'

const state = reactive({
    currencies: null
})
const fetchCBR = () => {
        axios
        .get("https://www.cbr-xml-daily.ru/daily_json.js")
        .then((response) => {
          state.currencies = response.data
        })
    }
fetchCBR()

const showCart = ref(false)
const changeCartVisibility = () => {
    showCart.value = !showCart.value
}
const data = useShoppingStore()
</script>