<template>
    <div class="card">
          <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
            data-mdb-ripple-color="light">
            <div class="image-container">
              <img :src="product.get_thumbnail" class="image-fit" />
            </div>
          </div>
          <div class="card-body">
            <router-link :to ="product.get_absolute_url" class="text-reset">
              <h5 class="card-title mb-3">{{product.name}}</h5>
            </router-link>
              <p>{{product.category}}</p>
            <h6 class="mb-3">{{product.price}}</h6>
          </div>
        </div>
</template>
<script setup>
const {product} = defineProps(['product'])
</script>

<style scoped>
.image-container {
  height: 0;
  padding-bottom: 100%; /* Creates a square aspect ratio container */
  position: relative;
  overflow: hidden;
}

.image-fit {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Keeps the aspect ratio and fills the container */
}
</style>