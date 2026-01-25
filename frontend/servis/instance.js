import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const instance = axios.create({
  baseURL: "https://i-doctor-production.up.railway.app/api",
});

instance.interceptors.request.use(
   
  async (config) => {

    const token = await AsyncStorage.getItem("token"); 
    console.log(token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Token expired!");
      await AsyncStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);
