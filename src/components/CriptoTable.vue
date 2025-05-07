<template>
  <div class="container mt-5">
    <h2 class="text-center">Tabla de Precios de Criptomonedas</h2>

    <!-- Selector de criptomoneda -->
    <div class="mb-3">
      <label for="crypto" class="form-label">Seleccionar Criptomoneda:</label>
      <select v-model="selectedCrypto" id="crypto" class="form-select" @change="fetchCryptoData">
        <option v-for="crypto in availableCryptos" :key="crypto" :value="crypto">
          {{ crypto }}
        </option>
      </select>
    </div>

    <table class="table table-striped mt-4">
      <thead>
        <tr>
          <th>Exchange</th>
          <th>Precio Compra</th>
          <th>Precio Venta</th>
          <th>Total Compra</th>
          <th>Total Venta</th>
          <th>Última Actualización</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, exchange) in cryptoPrices" :key="exchange">
          <td>{{ exchange }}</td>
          <td>${{ data.bid }}</td>
          <td>${{ data.ask }}</td>
          <td>${{ (data.bid * volume).toFixed(2) }}</td>
          <td>${{ (data.ask * volume).toFixed(2) }}</td>
          <td>{{ new Date(data.time * 1000).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getCryptoPrices } from "../servicios/CriptoPrecios";

export default {
  setup() {
    const cryptoPrices = ref({}); // Datos de precios de criptomonedas
    const selectedCrypto = ref("BTC"); // Criptomoneda seleccionada
    const fiat = ref("ARS"); 
    const volume = ref(0.1); // Volumen de referencia para calcular totales

    // Lista de criptomonedas disponibles
    const availableCryptos = ["BTC", "ETH", "USDT", "SOL", "ADA"]; // Agrega más monedas si es necesario

    // Función para obtener los datos de precios
    const fetchCryptoData = async () => {
      try {
        const data = await getCryptoPrices(selectedCrypto.value, fiat.value, volume.value, ["buenbit", "binance", "ripio"]);
        console.log("Datos obtenidos:", data); // Verifica los datos en la consola
        cryptoPrices.value = data || {}; // Asigna los datos o un objeto vacío si no hay datos
      } catch (error) {
        console.error("Error al obtener los datos de las criptomonedas:", error);
        cryptoPrices.value = {}; // Limpia los datos en caso de error
      }
    };

    // Llamada inicial al montar el componente
    onMounted(() => {
      fetchCryptoData();
    });

    return {
      cryptoPrices,
      selectedCrypto,
      fiat,
      volume,
      availableCryptos,
      fetchCryptoData,
    };
  },
};
</script>