import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const instance = axios.create({
  baseURL: "https://deadra-supernormal-authentically.ngrok-free.dev/api",
});

instance.interceptors.request.use(
   
  async (config) => {
    console.log(token)
    const token = await AsyncStorage.getItem("token"); 
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
