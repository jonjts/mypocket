import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'


const api = axios.create({
  baseURL: 'https://api.github.com',
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem("@token");
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
