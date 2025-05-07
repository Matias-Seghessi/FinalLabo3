import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    username: null, // Nombre de usuario
    isLoggedIn: false, // Estado de autenticación
    transactionHistory: [], // Historial de transacciones
  }),
  actions: {
    login(username) {
      this.username = username;
      this.isLoggedIn = true;
      this.saveStateToLocalStorage(); // Guarda el estado en localStorage
    },
    logout() {
      this.username = null;
      this.isLoggedIn = false;
      this.transactionHistory = [];
      localStorage.removeItem("userStore"); // Limpia el localStorage
    },
    addTransaction(transaction) {
      this.transactionHistory.push(transaction);
      this.saveStateToLocalStorage(); // Guarda el estado actualizado
    },
    saveStateToLocalStorage() {
      const state = {
        username: this.username,
        isLoggedIn: this.isLoggedIn,
        transactionHistory: this.transactionHistory,
      };
      localStorage.setItem("userStore", JSON.stringify(state));
    },
    loadStateFromLocalStorage() {
      const state = JSON.parse(localStorage.getItem("userStore"));
      if (state) {
        this.username = state.username;
        this.isLoggedIn = state.isLoggedIn;
        this.transactionHistory = state.transactionHistory;
      }
    },
  },
});