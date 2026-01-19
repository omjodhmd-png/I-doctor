import axios from "axios";

export const instance = axios.create({
    baseURL: "https://deadra-supernormal-authentically.ngrok-free.dev/api" 
});