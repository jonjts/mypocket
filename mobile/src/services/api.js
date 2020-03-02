import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'


const api = axios.create({
  baseURL: 'http://192.168.0.6:3333/api',
});

api.defaults.timeout =  60 * .3 * 1000; // 30 sec

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem("@token");
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
