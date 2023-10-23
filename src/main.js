import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import $bus from './Utils/events.js'

axios.defaults.baseURL= 'http://127.0.0.1:8000'

const app = createApp(App);
app.provide('$bus', $bus);
app.use(store);
app.use(router);
app.mount('#app');
