import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/tailwind.css'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
createApp(App).use(store).use(router).use(FloatingVue).mount('#app')
