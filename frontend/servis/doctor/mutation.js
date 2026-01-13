import { useMutation } from "@tanstack/react-query";
import { instance } from "../instance.js";
import  useAuthStore  from "../../stor/login-store.js";

export function useCreateDoctor() {
    
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: async (doctorData) => {
      const res = await instance.post("/doctors", doctorData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });
}
