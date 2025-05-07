<template>
  <div :class="themeClass" class="app-container">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/compra">Compra</router-link> |
      <router-link to="/venta">Venta</router-link> |
      <router-link to="/historial">Historial</router-link> |
      <router-link v-if="!userStore.isLoggedIn" to="/login">Login</router-link>
      <span v-if="userStore.isLoggedIn">
        Bienvenido, {{ userStore.username }} |
        <button @click="logout">Cerrar Sesión</button>
      </span>
      <!-- Botón para cambiar el tema -->
      <button @click="toggleTheme" class="btn btn-secondary ms-3">
        Cambiar Tema
      </button>
    </nav>
    <router-view></router-view>
  </div>
</template>


<script setup>
import { useUserStore } from './store/userStore';
import {ref, computed} from 'vue';

const userStore = useUserStore();

const isDarkTheme = ref(false);

function toggleTheme() {
  isDarkTheme.value = !isDarkTheme.value;
  document.body.classList.toggle('dark-theme', isDarkTheme.value);
}

const themeClass = computed(() => {
  return isDarkTheme.value ? 'dark-theme' : 'light-theme';
});

function logout(){
  userStore.logout();
  window.location.reload();
}
</script>
