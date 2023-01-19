<template>
    <header class="sticky top-0 bg-white shadow-lg z-40">
        <div class="flex py-5 px-8 justify-between">
            <div class="flex">
                <router-link tag="a" to="/">
                    <!-- <img src="../assets/logo.svg" class="mr-2"> -->
                    <div class="logo mr-2"></div>
                </router-link>
                <input type="text" placeholder="Search items, collections, and accounts"
                class="block w-96 px-5 rounded-full bg-gray-100 border focus:outline-none focus:border-purple-600 transition duration-150 ease-in-out" v-model="state.search" @input="searchCity">
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
        <div v-if="state.suggestions.length">
            <p v-for="(item, i) in state.suggestions" :key="i">
                {{item.value}}
                <!-- <pre>{{item}}</pre> -->
            </p>
        </div>
        <CartSidebar v-if="showCart" @closeCart="showCart = false" :rub="state.currencies.Valute.USD.Value" />
    </header>
</template>

<script setup>
import {ref, reactive, onMounted} from 'vue'
import { useShoppingStore } from '../stores'
import CartSidebar from './CartSidebar.vue'
import axios from 'axios'

const state = reactive({
    currencies: null,
    search: '',
    suggestions: [],
    myMap: null
})


const fetchCBR = () => {
        axios
        .get("https://www.cbr-xml-daily.ru/daily_json.js")
        .then((response) => {
          state.currencies = response.data
        })
    }
fetchCBR()

const searchCity = () => {
    let config = {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token 9af39234497ecdb87b348d7f03ebd56ae452eda3`
          }
        }
    axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {query: state.search}, config)
    .then((res) => {
        state.suggestions = res.data.suggestions
        // console.log(res.data.suggestions)
    })
}

const showCart = ref(false)
const changeCartVisibility = () => {
    showCart.value = !showCart.value
}
const data = useShoppingStore()
</script>

<style scoped>
.logo{
    height: 40px;
    width: 40px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 100% 0%;
    background-image: url('https://telegram.org/img/t_logo_sprite.svg');
}
.logo:hover{
    animation: 1s steps(30) both;
    animation-name: t-logo-play;
}
@keyframes t-logo-play {
    0% {
        background-position: 0% 0%;
    }
    100%{
        background-position: 100% 0%;
    }
}
</style>