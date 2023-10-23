<template>
    <div class="row">
      <div v-for="product in latestProducts" :key="product.id" class="col-lg-3 col-md-12 mb-4">
        <ProductCard :product="product"></ProductCard>
      </div>
    </div>
   
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ProductCard from '../components/ProductCard.vue'

let latestProducts = ref([]);

function getLatestProducts(){
  axios
  .get('api/v1/latest-products')
  .then(response => {
    latestProducts.value = response.data
   })
  .catch(error =>{
    console.log(error)
  });
}
onMounted(getLatestProducts);

</script>

