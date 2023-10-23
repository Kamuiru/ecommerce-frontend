<template>
    <div class="row">
        <div class="text-center mb-3">
            <h2> Results for '{{ query }}'</h2>
        </div>
      <div v-for="product in products" :key="product.id" class="col-lg-3 col-md-12 mb-4">
        <ProductCard :product="product"></ProductCard>
      </div>
    </div>
</template>

<script setup>
import { onMounted,ref } from 'vue';
import axios from 'axios';
import ProductCard from '@/components/ProductCard.vue';
import { useStore } from 'vuex';

const store = useStore()
let products = ref([])
let query = ref('')

onMounted(()=>{
    let uri = window.location.search.substring(1)
    let params = new URLSearchParams(uri)
    if(params.get('query')){
        query.value = params.get('query')

        search()
    }

})

async function search(){
    store.commit('isLoading', true)
    await axios
    .post('api/v1/products/search', {'query':query.value})
    .then(response => {
        products.value = response.data
    })
    .catch(error => {
        console.log(error)
    })
    store.commit('isLoading', false)
}

</script>