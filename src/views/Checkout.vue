<template>
    <section class="h-100 h-custom" style="margin-top:-5%;" >
  <div class="container h-100 py-5">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div class="card shopping-cart" style="border-radius: 15px;">
          <div class="card-body text-black">

            <div class="row">
              <div class="col-lg-6 px-5 py-4">

                <h3 class="mb-5 pt-2 text-center fw-bold text-uppercase">Your products</h3>

                <checkout-item
                    v-for="(item, index) in items" :key="index"
                    :item =item
                ></checkout-item>
               

                <hr class="mb-4" style="height: 2px; background-color: #1266f1; opacity: 1;">

                <div class="d-flex justify-content-between p-2 mb-2" style="background-color: #e1f5fe;">
                  <h5 class="fw-bold mb-0">Total:</h5>
                  <h5 class="fw-bold mb-0">Ksh {{ totalPrice }}</h5>
                </div>

              </div>
              <div class="col-lg-6 px-5 py-4">

                <h3 class="mb-5 pt-2 text-center fw-bold text-uppercase">Payment</h3>

                <form class="mb-2">

                  <div class="form-outline mb-2">
                    <input type="text" id="typeText" class="form-control form-control-lg" siez="17" v-model="card_number"
                      />
                    <label class="form-label" for="typeText">Card Number</label>
                  </div>

                  <div class="form-outline mb-2">
                    <input type="text" id="typeName" class="form-control form-control-lg" siez="17" v-model="phone"
                       />
                    <label class="form-label" for="typeName">Phone</label>
                  </div>

                  <div class="form-outline mb-2">
                    <input type="text" id="typeName" class="form-control form-control-lg" siez="17" v-model="card_name"
                       />
                    <label class="form-label" for="typeName">Name on card</label>
                  </div>

                  <button @click="submit" type="button" class="btn btn-primary btn-block btn-lg">Buy now</button>

                  <h5 class="fw-bold mb-5" style="position: absolute; bottom: 0;">
                    <router-link to="/"><i class="fas fa-angle-left me-2"></i>Back to shopping</router-link>
                  </h5>

                </form>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
<script setup>
import CheckoutItem from '../components/CheckoutItem.vue'
import { useStore } from 'vuex';
import {onMounted, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

let totalPrice = ref(0 )

const phone = ref('')
const card_number = ref('')
const card_name = ref('')



const store = useStore();
const router = useRouter();
const items = store.state.cart.items



function getTotalPrice(){
  for(let i = 0; i < store.state.cart.items.length; i++){
  totalPrice.value += store.state.cart.items[i].product.price * store.state.cart.items[i].quantity
  
}
}
onMounted(getTotalPrice)
const paid_amount = ref(totalPrice.value)
function submit(){
  const orders = []
  for(let i = 0; i < store.state.cart.items.length; i++){
    const item = store.state.cart.items[i]
    const obj = {
      product: item.product.id,
      quantity: item.quantity,
      price: item.product.price *item.quantity
    }
    orders.push(obj)
  }

  const formData = new FormData()
  formData.append('paid_amount', paid_amount.value)
  formData.append('phone', phone.value)
  formData.append('card_number', card_number.value)
  formData.append('card_name', card_name.value)
  formData.append('orders', orders)

  axios
  .post('api/v1/checkout/', formData)
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.log(error)
  })

  router.push('/success');
}


</script>
