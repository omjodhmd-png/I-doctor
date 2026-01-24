import { useMutation } from "@tanstack/react-query";
import { instance } from "../instance.js";

export function useCreateDoctor() {
  return useMutation({
    mutationFn: async (doctorData) => {
      const res = await instance.post("/doctors", doctorData);
      return res.data;
    },
  });
}
