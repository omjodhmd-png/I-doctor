import { instance } from "../instance.js";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../stor/login-store.js";




export function useGetDoctorTotalBookings(doctorId) {
 

  return useQuery({
    queryKey: ["doctor-total-bookings", doctorId],
    queryFn: async () => {
      if (!doctorId) return null;

      try {
        const token = useAuthStore.getState().token;
        const res = await instance.get(
          `/bookings/doctor/${doctorId}/total-bookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return res.data;
      } catch (error) {
        console.error(
          "Total bookings query error:",
          error.response?.data || error.message
        );
        throw error;
      }
    },
    enabled: !!doctorId,
    retry: 1,
  });
}




export function useGetDoctorConfirmedToday(doctorId) {
  return useQuery({
    queryKey: ["doctor-confirmed-today", doctorId],
    queryFn: async () => {
      if (!doctorId) return null;

      const token = useAuthStore.getState().token;
      if (!token) throw new Error("Not authenticated");

      const res = await instance.get(
        `/bookings/doctor/${doctorId}/confirmed-today`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // example response: { confirmedToday: 5 }
      return res.data;
    },
    enabled: !!doctorId,
    retry: 1,
  });
}

export function useGetDoctorBookings() {
    return useQuery({
      queryKey: ["doctor-bookings"],
      queryFn: async () => {
        const token = useAuthStore.getState().token;
  
        const res = await instance.get("/bookings/doctor/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        return res.data;
      },
    });
  }
  