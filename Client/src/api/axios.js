import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

export const guestApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: false,
});