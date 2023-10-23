<template>
    <div class="d-flex align-items-center mb-2 justify-content-between">
        <div class="flex-shrink-0">
        <img :src="item.product.get_image"
            class="img-fluid" style="width: 150px;" alt="Generic placeholder image">
        </div>
        <div class="">
        <h5 class="">{{ item.product.name }}</h5>
        <h5 class="">Ksh {{ item.product.price * item.quantity}}</h5>
        <h5 class="">QTY {{ item.quantity }}</h5>
        </div>
    </div>         
</template>

<script setup>
const {item} = defineProps(['item'])

</script>