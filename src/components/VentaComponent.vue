<template>
  <div class="container mt-5">
    

    <div class="row">
      <!-- Columna izquierda: Componente CriptoTable -->
      <div class="col-md-6">
        <CriptoTable :cryptoPrices="cryptoPrices" />
      </div>

      <!-- Columna derecha: Formulario de venta -->
      <div class="col-md-6derecha">
        <h2 class="text-center">Venta de Criptomonedas</h2>
        <form @submit.prevent="handleSale" class="mt-4">
          <div class="mb-3">
            <label for="crypto" class="form-label">Seleccionar Criptomoneda:</label>
            <select v-model="selectedCrypto" id="crypto" class="form-select" @change="fetchCryptoPrice">
              <option v-for="crypto in availableCryptos" :key="crypto" :value="crypto">
                {{ crypto }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="amount" class="form-label">Cantidad:</label>
            <input
              type="number"
              id="amount"
              v-model.number="amount"
              class="form-control"
              placeholder="Cantidad a vender"
              step="0.000001"
            />
          </div>

          <p v-if="amount > 0" class="text-success">Total en pesos: ${{ totalInPesos }}</p>

          <button type="submit" class="btn btn-success">Vender</button>
        </form>

        <div v-if="confirmationMessage" class="alert alert-info mt-3">
          <p>{{ confirmationMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCryptoPrices } from "../servicios/CriptoPrecios";
import { useUserStore } from "../store/userStore";
//import { saveSale } from "../Servicios/RestDBservice";
import CriptoTable from "./CriptoTable.vue"; // Asegúrate de que la ruta sea correcta

export default {
  components: {
    CriptoTable,
  },
  data() {
    return {
      availableCryptos: ["BTC", "ETH", "USDT", "SOL", "ADA"], // Puedes añadir más monedas
      selectedCrypto: "BTC",
      amount: 0,
      cryptoPrice: 0, // Precio actual de la criptomoneda seleccionada
      confirmationMessage: "",
    };
  },
  computed: {
    // Calcula automáticamente el total en pesos
    totalInPesos() {
      return (this.amount * this.cryptoPrice).toFixed(2);
    },
  },
  methods: {
    async fetchCryptoPrice() {
      // Obtén el precio actual de la criptomoneda seleccionada
      const data = await getCryptoPrices(this.selectedCrypto, "ARS", 1, ["buenbit", "binance", "ripio"]);
      if (data) {
        // Usa el precio promedio de venta como referencia
        const prices = Object.values(data);
        const averagePrice = prices.reduce((sum, exchange) => sum + exchange.ask, 0) / prices.length;
        this.cryptoPrice = averagePrice.toFixed(2);
      } else {
        this.cryptoPrice = 0;
      }
    },
    handleSale() {
      if (this.amount > 0) {
        const userStore = useUserStore(); // Obtener el store del usuario
        const transaction = {
          user: userStore.username, // Usuario logueado
          action: "venta", // Tipo de acción
          crypto: this.selectedCrypto, // Criptomoneda
          amount: this.amount, // Cantidad de criptomoneda vendida
          money: this.totalInPesos, // Total en pesos
          datetime: new Date().toISOString(), // Fecha y hora de la venta
        };

        try {
          // Guardar la transacción en el localStorage
          const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
          transactions.push(transaction);
          localStorage.setItem("transactions", JSON.stringify(transactions));

          // Mostrar mensaje de éxito
          this.confirmationMessage = `Has vendido ${this.amount} ${this.selectedCrypto} exitosamente por $${this.totalInPesos}.`;

          // Reiniciar el formulario
          this.amount = 0;
        } catch (error) {
          // Mostrar mensaje de error
          this.confirmationMessage = "Ocurrió un error al guardar la venta.";
          console.error("Error al guardar la venta:", error);
        }
      } else {
        this.confirmationMessage = "Por favor, ingresa una cantidad válida.";
      }
    },
  },
  mounted() {
    // Obtén el precio inicial de la criptomoneda seleccionada al cargar el componente
    this.fetchCryptoPrice();
  },
};
</script>