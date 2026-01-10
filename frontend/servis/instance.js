import axios from "axios";

export const instance = axios.create({
    baseURL:"http://192.168.43.249:5000/api"
})