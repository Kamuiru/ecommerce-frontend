<template>
    <div class="row">
        <div class="text-center mb-3">
            <h2>{{ category.name }}</h2>
        </div>
      <div v-for="product in category.products" :key="product.id" class="col-lg-3 col-md-12 mb-4">
        <ProductCard :product="product"></ProductCard>
      </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch,  } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import Product from './Product.vue';
import ProductCard from '../components/ProductCard.vue'
import { useRoute } from 'vue-router';
import { defineProps } from 'vue';

const route = useRoute()
const store = useStore();
let category = ref({})


const {category_slug} = defineProps(['category_slug'])

async function getCategory(category_slug){
    store.commit('isLoading', true)
    await axios
    .get(`api/v1/products/${category_slug}`)
    .then(response => {
        category.value = response.data
    })
    .catch(error => {
        console.log(error)
    })
    store.commit('isLoading', false)
}
onMounted(() => {
  getCategory(route.params.category_slug);
});

watch(route, (to, from) => {
  if (to.name === 'category') {
    getCategory(to.params.category_slug);
  }
});


</script>

