import { useMutation } from "@tanstack/react-query";
import { instance } from "../instance";



export function useCreatUser(){
    return useMutation({
         mutationFn: async({ fullName , email ,password ,role})=>{
             const res=await instance.post("/register",{
                fullName,
                email,
                password,
                role
             });
             return res.data;
         }
    })
}


