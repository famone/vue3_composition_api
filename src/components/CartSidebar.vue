<template>
    <div class="bg-white absolute right-0 top-full px-10 py-2 shadow-lg divide-y">
        <div class="flex justify-between items-center py-4" v-for="(item, idx) in data.getCartItems" :key="idx">
            <div class="flex items-center w-64 mr-8">
                <div class="h-10 w-10 rounded-[10px] bg-cover bg-no-repeat bg-center mr-4" :style="`background-image: url('src/assets/${item.img}.jpg')`"></div>
                <h4 class="text-black font-bold leading-tight text-sm">{{item.name}}</h4>
            </div>
            <p class="text-black font-medium leading-tight text-sm">${{item.price}}</p>
            <div class="mx-5 flex justify-center items-center">
                <button type="button" class="flex items-center rounded-sm border border-transparent bg-gray-300 p-1 text-white shadow-sm hover:bg-gray-400 focus:outline-none" @click="data.decreaseQuant(idx)">
                    <i class="fa-solid fa-minus text-[12px]"></i>
                </button>
                <p class="mx-2">{{item.quantity}}</p>
                <button type="button" class="flex items-center rounded-sm border border-transparent bg-gray-300 p-1 text-white shadow-sm hover:bg-gray-400 focus:outline-none" @click="data.increaseQuant(idx)">
                    <i class="fa-solid fa-plus text-[12px]"></i>
                </button>
            </div>
            <i class="fa-solid fa-trash text-gray-400 cursor-pointer ml-3 hover:text-red-500" @click="data.deleteItem(idx)"></i>
        </div>
        <div class="py-4 text-right">
            <p class="text-black font-light leading-tight text-xl">Total: ${{countCartTotal}}</p>
        </div>
    </div>
</template>

<script setup>
import { useShoppingStore } from '../stores'
import { computed } from 'vue'

const data = useShoppingStore()
const countCartTotal = computed(() => {
    let total = 0
    if(!data.getCartItems.length){
        return 0
    }else{
        data.getCartItems.forEach(item =>{
            total += item.quantity * item.price
        })
        return total
    }
})

</script>