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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const logout = useGlobal.getState().logout;
      logout()
    }
    return Promise.reject(error);
  }
);

export default api;
