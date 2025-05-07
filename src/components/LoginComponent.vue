<template>
  <div class="container mt-5">
    <h2 class="text-center">Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin" class="mt-4">
      <div class="mb-3">
        <label for="username" class="form-label">Usuario:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          class="form-control"
          placeholder="Ingresa tu usuario"
          required
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Contraseña:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="form-control"
          placeholder="Ingresa tu contraseña"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
    </form>
    <p v-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { useUserStore } from "../store/userStore";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    handleLogin() {
      const userStore = useUserStore();

      // Validación simple (puedes reemplazar esto con una API real)
      if (this.username && this.password) {
        userStore.login(this.username);
        this.$router.push("/"); // Redirige al Home después del login
      } else {
        this.errorMessage = "Usuario o contraseña inválidos.";
      }
    },
  },
};
</script>