import { defineStore } from 'pinia'

export const useShoppingStore = defineStore('shopping', {
    state: () => {
        return { 
            products: [
                {
                    id: 1,
                    name: 'Andrew Ng',
                    price: 120,
                    author: 'Azah Anyeni',
                    img: 'g1'
                },
                {
                    id: 2,
                    name: 'Battle for Digital',
                    price: 399,
                    author: 'Sijmen Immens',
                    img: 'g2'
                },
                {
                    id: 3,
                    name: 'A Rare Path',
                    price: 190,
                    author: 'Andrei Masharin',
                    img: 'g3'
                },
                {
                    id: 4,
                    name: 'Software Secret Algorithms',
                    price: 220,
                    author: 'Wim Willems',
                    img: 'g4'
                }
            ],
            cartItems : [],
            likes: []
        }
    },
    getters: {
        getGoods(){
            return this.products
        },
        getCartItems(){
            return this.cartItems;
        },
        getLikes(){
            return this.likes
        }
    },
    actions: {
        addToCart(item){
            let productInCart = this.cartItems.find(i => {
                return i.id === item.id
            })
            if(!productInCart){
                item.quantity = 1
                this.cartItems.push(item)
            }else{
                productInCart.quantity++
            }
        },
        setLike(id){
            if(this.likes.includes(id)){
                this.likes = this.likes.filter(e => e !== id)
            }else{
                this.likes.push(id)
            }
        }
        // addToCart(item) {
        //     let index = this.cartItems.findIndex(product => product.id === item.id);
        //     if(index !== -1) {
        //       this.products[index].quantity += 1;
        //       Swal.fire({
        //         position: 'top-end',
        //         icon: 'success',
        //         title: 'Your item has been updated',
        //         showConfirmButton: false,
        //         timer: 1500
        //       });
        //     }else {
        //       item.quantity = 1;
        //       this.cartItems.push(item);
        //       Swal.fire({
        //         position: 'top-end',
        //         icon: 'success',
        //         title: 'Your item has been saved',
        //         showConfirmButton: false,
        //         timer: 1500
        //       });
        //     }
        // },
    },
})