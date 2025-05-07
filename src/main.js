import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const pinia = createPinia()

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../src/assets/Styles.css";

import{useUserStore} from './store/userStore.js'
const userStore = useUserStore(pinia);
userStore.loadStateFromLocalStorage(); // Cargar el estado desde localStorage al iniciar la aplicación

createApp(App).use(router).use(pinia).mount('#app')