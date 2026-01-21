import { instance } from "../instance.js";
import { useQuery } from "@tanstack/react-query";

export function useGetAllDoctors(params = {}) {
 
  const speciality = typeof params === 'string' ? params : params?.speciality || null;
  const search = typeof params === 'object' ? params?.search || "" : "";

  return useQuery({
    queryKey: ["doctors", speciality, search],
    queryFn: async () => {
      try {
        const res = await instance.get("/doctors", {
          params: { 
          
            ...(speciality && { speciality }),
            ...(search && { search })
          },
        });
        return res.data;
      } catch (error) {
        console.error("Query Error:", error.response?.data || error.message);
        throw error;
      }
    },
    retry: 1, 
  });
}

export function useGetDoctor(id) {
  return useQuery({
    queryKey: ["doctor", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await instance.get(`/doctors/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}