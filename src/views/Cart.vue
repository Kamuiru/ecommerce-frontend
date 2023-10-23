<template>
    <section class="h-100 gradient-custom">
  <div class="container py-5">
    <div class="row d-flex justify-content-center my-4">
      <div class="col-md-8">
        <div class="card mb-4">
          <div class="card-header py-3">
            <h5 class="mb-0">Cart</h5>
          </div>
          <div class="card-body">
            <!-- Single item -->
            <CartItem
                v-for="item in allItems" :key="item.product.id" :item="item"
               
            ></CartItem>
            <!-- Single item -->
            <hr class="my-4" />
          </div>
        </div>
        
      </div>
      <div class="col-md-4">
        <div class="card mb-4">
          <div class="card-header py-3">
            <h5 class="mb-0">Summary</h5>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              
              <li
                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                <div>
                  <strong>Total amount</strong>
                  <strong>
                    <p class="mb-0">(including VAT)</p>
                  </strong>
                </div>
                <span><strong>Ksh {{ totalPrice }}</strong></span>
              </li>
            </ul>
            <router-link to="/checkout" class="btn btn-primary">
                Go to checkout
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
import CartItem from '@/components/CartItem.vue';
import { useStore } from 'vuex';
import {onMounted, ref, inject } from 'vue';

const bus = inject('$bus');



let totalPrice = ref(0 )
const store = useStore()

let allItems = ref(store.state.cart.items)


function getTotalPrice(){
  for(let i = 0; i < store.state.cart.items.length; i++){
  totalPrice.value += store.state.cart.items[i].product.price * store.state.cart.items[i].quantity
  
}
}
onMounted(getTotalPrice)


bus.$on('cart-decrement', ()=>{
  totalPrice.value = 0
  getTotalPrice()
})
bus.$on('cart-increment', ()=>{
  totalPrice.value = 0
  getTotalPrice()
})

bus.$on('deleted', (id)=>{
  const storedCart = JSON.parse(localStorage.getItem('cart'));
  const indexToRemove = storedCart.items.findIndex(i=>i.product.id === id);
  
  console.log('item.product.id:', id);
  if (indexToRemove !== -1) {
    storedCart.items.splice(indexToRemove, 1);
    store.commit('newCart', storedCart)
    allItems.value = storedCart.items
    totalPrice.value = 0
    getTotalPrice()
    console.log('deleted');
  }else{
    allItems.value = store.state.cart.items
    totalPrice.value = 0
    getTotalPrice()
  }
  
})

</script>