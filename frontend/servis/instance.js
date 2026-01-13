import axios from "axios";

export const instance = axios.create({
    baseURL:"http://192.168.1.162:5000/api"
})