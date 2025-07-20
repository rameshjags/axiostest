import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL;

if (!API_URL) {
  throw new Error('API_URL is not defined in app.json or .env');
}



const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log(api)

export default api;