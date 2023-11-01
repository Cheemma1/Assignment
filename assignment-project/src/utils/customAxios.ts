import axios from "axios";

const customAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_URL as string,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export default customAxios;
