import axios from "axios";

const ADDRESS = 'https://api.etamin.agency/api/v1/'

const api = axios.create({
    baseURL: ADDRESS,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  export default api;