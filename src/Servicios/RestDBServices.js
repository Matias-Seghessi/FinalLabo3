import axios from "axios";

// Configuración del cliente Axios para la API de restdb.io
const apiClient = axios.create({
  baseURL: "https://laboratorio-36cf.restdb.io/rest/", // URL base de la API
  headers: {
    "x-apikey": "64a5ccf686d8c5d256ed8fce", // API Key
  },
});

// Función para obtener todos los datos de una colección
export async function getAllData(collection) {
  try {
    const response = await apiClient.get(`/${collection}`);
    console.log("Datos obtenidos:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo datos:", error);
    return null;
  }
}

// Función para obtener un dato específico por ID
export async function getDataById(collection, id) {
  try {
    const response = await apiClient.get(`/${collection}/${id}`);
    console.log("Dato obtenido:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo dato por ID:", error);
    return null;
  }
}

// Función para guardar datos en una colección
export async function saveData(collection, data) {
  try {
    const response = await apiClient.post(`/${collection}`, data);
    console.log("Datos guardados:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error guardando datos:", error);
    return null;
  }
}

// Función para actualizar un dato por ID
export async function updateData(collection, id, data) {
  try {
    const response = await apiClient.put(`/${collection}/${id}`, data);
    console.log("Datos actualizados:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error actualizando datos:", error);
    return null;
  }
}

// Función para eliminar un dato por ID
export async function deleteData(collection, id) {
  try {
    const response = await apiClient.delete(`/${collection}/${id}`);
    console.log("Dato eliminado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error eliminando dato:", error);
    return null;
  }
}


export async function saveTransaction(transaction) {
  try {
    const response = await apiClient.post("/transactions",transaction);
    console.log("Transacción guardada:", response.data);
    return response.data; // Devuelve la respuesta de la API
  } catch (error) {
    console.error("Error al guardar la transacción:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
}

export async function saveSale(transaction) {
  try {
    const response = await apiClient.post("/transactions",transaction);
    console.log("Venta guardada:", response.data);
    return response.data; // Devuelve la respuesta de la API
  } catch (error) {
    console.error("Error al guardar la venta:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
}