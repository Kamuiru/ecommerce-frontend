<template>
    <div class="row">
        <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
        <!-- Image -->
            <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                <img :src="item.product.get_image"
                class="w-100" alt="Blue Jeans Jacket" />
                <a href="#!">
                <div class="mask" style="background-color: rgba(251, 251, 251, 0.2)"></div>
                </a>
            </div>
            <!-- Image -->
            </div>

            <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
            <!-- Data -->
            <p><strong>{{ item.product.name }}</strong></p>
            <p>Color: blue</p>
            <p>Size: M</p>
            <button type="button" @click="removeFromCart" class="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
                title="Remove item">
                <i class="fas fa-trash"></i>
            </button>
            <button type="button" class="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip"
                title="Move to the wish list">
                <i class="fas fa-heart"></i>
            </button>
            <!-- Data -->
            </div>

            <div class="col-lg-4 col-md-6 mb-2 mb-lg-0">
            <!-- Quantity -->
            <div class="d-flex mb-2" style="max-width: 300px">
                <button @click="decrement" class="btn btn-primary btn-sm mb-2 me-2"
                >
                <i class="fas fa-minus"></i>
                </button>
            

                <div class="form-outline">
                <input id="form1" min="0" name="quantity" :value="quantity" type="number" class="form-control" readonly/>
                <label class="form-label" for="form1">Quantity</label>
                </div>

                <button @click="increment" class="btn btn-primary btn-sm mb-2 ms-2"
                >
                <i class="fas fa-plus"></i>
                </button>
            </div>
            <!-- Quantity -->

            <!-- Price -->
            <p class="text-start text-md-center">
                <strong>Ksh {{ price }}</strong>
            </p>
             <!-- Price -->
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed, ref, inject } from 'vue';
import { useStore } from 'vuex';

const bus = inject('$bus');
const store = useStore();
const {item} = defineProps(['item'])
const id = ref(item.product.id)



let quantity = ref(item.quantity)
var price =  ref(item.product.price * quantity.value)
function increment(){
    quantity.value ++;
    price.value =  item.product.price * quantity.value
    item.quantity = quantity.value
    bus.$emit('cart-increment')
    updateCart()

}

function decrement(){
    quantity.value --;
    if(quantity.value <= 0){
        quantity.value = 1
    }
    price.value =  item.product.price * quantity.value
    item.quantity = quantity.value
    bus.$emit('cart-decrement')
    updateCart()
    
}
function updateCart(){
    localStorage.setItem('cart', JSON.stringify(store.state.cart))
}

function removeFromCart(){
    bus.$emit('deleted', id.value)
}



</script>