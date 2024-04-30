import axios from "axios";
import { useGlobal } from "./global";

const ADDRESS = 'https://api.etamin.agency/api/v1/'

const api = axios.create({
    baseURL: ADDRESS,
    headers: {
      'Content-Type': 'application/json',
    },
  });

api.interceptors.request.use(
  async (config) => {
    const auth = useGlobal.getState().auth;
    if (auth && auth.accessToken) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;