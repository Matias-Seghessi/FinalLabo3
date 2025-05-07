import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../store/userStore";
import Home from "../components/CriptoTable.vue";
import Compra from "../components/CompraComponent.vue";
import Venta from "../components/VentaComponent.vue";
import Login from "../components/LoginComponent.vue";
import HistorialComponent from "../components/HistorialComponent.vue";

const routes = [
  { path: "/login", component: Login }, // Ruta de login
  { path: "/", component: Home, meta: { requiresAuth: true } }, // Requiere autenticación
  { path: "/compra", component: Compra, meta: { requiresAuth: true } }, // Requiere autenticación
  { path: "/venta", component: Venta, meta: { requiresAuth: true } }, // Requiere autenticación
  {path: "/Historial",component: HistorialComponent, meta: {requiresAuth: true}} // Requiere autenticación
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guarda global para verificar autenticación
router.beforeEach((to, _from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    // Si la ruta requiere autenticación y el usuario no está logueado, redirige al login
    next("/login");
  } else {
    // De lo contrario, permite el acceso
    next();
  }
});

export default router;