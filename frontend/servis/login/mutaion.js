import { useMutation } from "@tanstack/react-query";
import { instance } from "../instance";



export function useLogin(){
    return useMutation({
         mutationFn: async({  email ,password })=>{
             const res=await instance.post("/login",{
                email,
                password,
             });
             return res.data;
         }
    })
}


