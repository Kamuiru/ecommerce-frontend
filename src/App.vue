<template>
  <div id="wrapper">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Shark</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse justify-content-start " id="navbarNav"> 
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/Winter">Winter</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/Summer">Summer</router-link>
            </li>
          </ul>
          <form class="form-inline md-form mr-auto mb- d-flex" action="/search">
              <input class="form-control mr-sm-2" type="text" placeholder="Search" name="query" aria-label="Search">
              <button class="btn btn-primary btn-rounded btn-sm my-2 ms-2" type="submit">Search</button>
            </form>
        </div>
        <div class="d-flex align-items-center"> 
          <button v-if="!store.state.isAuthenticated"  class="btn btn-primary">
            <router-link class="text-decoration-none text-dark" to="/log-in">Login</router-link>
          </button>
          <button v-if="!store.state.isAuthenticated" class="btn btn-primary ms-3">
            <router-link class="text-decoration-none text-dark" to="/signup">SignUp</router-link>
          </button>
          <div class=" ms-3" v-if="store.state.isAuthenticated">
            <router-link to="/my-account"><span><i class="fa fa-2x fa-user text-dark" aria-hidden="true"></i></span></router-link>
          </div>
          <div class=" ms-3">
            <router-link to="/cart"><span><i class="fa fa-2x fa-shopping-cart text-dark" aria-hidden="true"></i>({{ cartTotalLength }})</span></router-link>
          </div>
        </div>
      </div>
    </nav>
    <div v-if="store.state.isLoading == true" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div class="section container mt-5">
      <router-view/>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import axios from 'axios';
import { onBeforeMount, computed, ref, onMounted, watch } from 'vue';

const store = useStore();

onBeforeMount( ()=> {
  store.commit('initializeStore')
  document.title = 'Shark'

  const token = store.state.token

  if(token){
    axios.defaults.headers.common['Authorization'] = 'Token '+ token
  }else{
    axios.defaults.headers.common['Authorization'] = ''
  }
  console.log(store.state.cart.items)
})

const cartTotalLength = computed(()=>{
  let items = store.state.cart.items
  let totalLength = 0
  for(let i = 0; i<items.length; i++){
    totalLength += items[i].quantity
  }
  return totalLength;
})


</script>


