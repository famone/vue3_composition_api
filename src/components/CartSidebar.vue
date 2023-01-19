<template>
<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div class="fixed inset-0 overflow-hidden" @click="$emit('closeCart')">
    <div class="absolute inset-0 overflow-hidden">
      <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10" @click.stop>
  
        <div class="pointer-events-auto w-screen max-w-md">
          <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
            <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
              <div class="flex items-start justify-between">
                <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                <div class="ml-3 flex h-7 items-center">
                  <button type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500" @click="$emit('closeCart')">
                    <span class="sr-only">Close panel</span>
                    <!-- Heroicon name: outline/x-mark -->
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="mt-8">
                <div class="flow-root">
                  <ul role="list" class="-my-6 divide-y divide-gray-200">
                    <li class="flex py-6" v-for="(item, idx) in data.getCartItems" :key="idx">
                      <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img :src="`src/assets/${item.img}.jpg`" class="h-full w-full object-cover object-center">
                      </div>

                      <div class="ml-4 flex flex-1 flex-col">
                        <div>
                          <div class="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              {{item.name}}
                            </h3>
                            <p class="ml-4">${{item.price}}</p>
                          </div>
                          <p class="mt-1 text-sm text-gray-500">{{item.author}}</p>
                        </div>
                        <div class="flex flex-1 items-end justify-between text-sm">
                            <div class="flex">
                                 <button type="button" class="flex items-center rounded-sm border border-transparent bg-gray-300 p-1 text-white shadow-sm hover:bg-gray-400 focus:outline-none" @click="data.decreaseQuant(idx)">
                                    <i class="fa-solid fa-minus text-[12px]"></i>
                                </button>
                                <p class="text-gray-500 mx-2">Qty {{item.quantity}}</p>
                                <button type="button" class="flex items-center rounded-sm border border-transparent bg-gray-300 p-1 text-white shadow-sm hover:bg-gray-400 focus:outline-none" @click="data.increaseQuant(idx)">
                                    <i class="fa-solid fa-plus text-[12px]"></i>
                                </button>
                            </div>
                          <div class="flex">
                            <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500" @click="data.deleteItem(idx)">Remove</button>
                          </div>
                        </div>
                      </div>
                    </li>

                  </ul>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
              <div class="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p class="text-right">
                    ${{countCartTotal.toLocaleString()}}
                    <br>
                    {{Math.round(props.rub * countCartTotal).toLocaleString()}} ₽
                </p>
              </div>
              <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div class="mt-6">
                <a href="#" class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</a>
              </div>
              <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                  <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500" @click="$emit('closeCart')">
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useShoppingStore } from '../stores'
import { computed } from 'vue'

const props = defineProps(['rub'])

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

const emit = defineEmits(['closeCart'])

</script>