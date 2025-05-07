<template>
  <div class="container mt-5">
    <h2 class="text-center">Historial de Movimientos</h2>
    <table class="table table-striped mt-4">
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Criptomoneda</th>
          <th>Cantidad</th>
          <th>Total</th>
          <th>Tipo</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="movimientos.length === 0">
          <td colspan="6" class="text-center">No hay movimientos registrados</td>
        </tr>
        <tr v-for="(movimiento, index) in movimientos" :key="index">
          <td>{{ movimiento.user }}</td>
          <td>{{ movimiento.crypto }}</td>
          <td>{{ movimiento.amount }}</td>
          <td>${{ movimiento.money }}</td>
          <td>{{ movimiento.action }}</td>
          <td>{{ new Date(movimiento.datetime).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useUserStore } from "../store/userStore";

export default {
  setup() {
    const movimientos = ref([]);
    const userStore = useUserStore();

    // Función para cargar los movimientos desde el localStorage
    const fetchMovimientos = () => {
      const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
      // Filtrar movimientos por el usuario logueado
      movimientos.value = storedTransactions.filter(
        (transaction) => transaction.user === userStore.username
      );
    };

    // Llamada inicial al montar el componente
    onMounted(() => {
      fetchMovimientos();
    });

    // Observar cambios en el usuario logueado
    watch(
      () => userStore.username,
      () => {
        fetchMovimientos(); // Actualizar el historial cuando cambia el usuario
      }
    );

    return { movimientos };
  },
};
</script>