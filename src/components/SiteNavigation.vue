<template>
    <header class="sticky top-0 bg-white shadow-lg">
        <div class="flex py-5 px-8 justify-between">
            <div class="flex">
                <img src="../assets/logo.svg" class="mr-2">
                <input type="text" placeholder="Search items, collections, and accounts"
                class="block w-96 px-5 rounded-full bg-gray-100 border focus:outline-none focus:border-purple-600 transition duration-150 ease-in-out">
            </div>
            <div>
                <button class="inline-block px-6 py-3 bg-purple-600 text-white font-medium text-xs uppercase rounded-full hover:bg-purple-500 transition duration-300 ease-in-out" @click="changeCartVisibility">shop cart {{data.getCartItems.length}}</button>
            </div>
        </div>
        <CartSidebar v-if="showCart" />
    </header>
</template>

<script setup>
import {ref} from 'vue'
import { useShoppingStore } from '../stores'
import CartSidebar from './CartSidebar.vue'

const showCart = ref(false)
const changeCartVisibility = () => {
    showCart.value = !showCart.value
}
const data = useShoppingStore()
</script>