<template>
    <section id="shop" class="py-16">
        <div class="container mx-auto">
            <div class="grid grid-cols-4 gap-x-6">
                <div class="col-span-4">
                    <h2 class="text-black font-extrabold leading-tight text-2xl mb-10">Recommended creators</h2>
                </div>
                <div class="col-span-1 mb-10" v-for="(item, idx) in data.products" :key="idx">
                    <div class="h-[19rem] rounded-[12px] bg-cover bg-no-repeat bg-center w-full mb-4 relative overflow-hidden group" :style="`background-image: url('src/assets/${item.img}.jpg')`">
                        <div class="absolute h-full w-full group-hover:bg-black/30 group-hover:backdrop-blur-sm transition duration-300 ease-in-out flex items-center justify-center">
                            <i class="fa-regular fa-heart text-white text-4xl cursor-pointer hidden group-hover:block" @click="setLike(item.id)" v-if="!data.getLikes.includes(item.id)"></i>
                            <i class="fa-solid fa-heart text-white text-4xl cursor-pointer hidden group-hover:block" @click="setLike(item.id)" v-else></i>
                        </div>
                    </div>
                    <h3 class="text-black font-extrabold leading-tight text-lg">{{item.name}}</h3>
                    <p class="text-[#5D5D5B] font-light text-sm">by {{item.author}}</p>
                    <div class="flex justify-between items-center mt-1">
                        <p class="text-black font-medium leading-tight text-2xl">${{item.price}}</p>
                        <button class="inline-block px-6 py-3 bg-purple-600 text-white font-medium text-xs uppercase rounded-full hover:bg-purple-500 transition duration-300 ease-in-out" @click="addToCart(item)" :class="{ 'bg-green-400 hover:bg-green-500' : itemInCart(item.id) }">
                            <i v-if="itemInCart(item.id)" class="fa-solid fa-check"></i>
                            {{ itemInCart(item.id) ? 'In cart' : 'Buy now' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useShoppingStore } from '../stores'

const data = useShoppingStore()
const cart = reactive([])

const addToCart = (item) => {
    data.addToCart(item)
}
const setLike = (id) => {
    data.setLike(id)
}

const itemInCart= (id) => {
    let productInCart = data.getCartItems.find(item => {
        return item.id === id
    })
    if(productInCart){
        return true
    }else{
        return false
    }
}

</script>