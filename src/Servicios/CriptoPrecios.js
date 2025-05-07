import axios from "axios";

const API_URL = "https://criptoya.com/api";

export async function getCryptoPrices(crypto = "BTC", fiat = "ARS", volume = 0.1, exchanges = ["buenbit", "binance", "ripio"]) {
  try {
    const response = await axios.get(`${API_URL}/${crypto}/${fiat}/${volume}`);
    const filteredData = Object.fromEntries(
      Object.entries(response.data).filter(([key]) => exchanges.includes(key))
    );
    console.log("Datos filtrados:", filteredData); // Verifica en consola
    return filteredData;
  } catch (error) {
    console.error("Error obteniendo precios de criptos:", error);
    return null;
  }
}