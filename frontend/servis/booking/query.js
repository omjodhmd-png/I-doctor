import { instance } from "../instance.js";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../stor/login-store.js";


export const useGetBookingDetails = (bookingId) => {
  const token = useAuthStore.getState().token;

  return useQuery({
    queryKey: ["booking-details", Number(bookingId)],
    queryFn: async () => {
      const res = await instance.get(`/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!bookingId && !!token,
  });
};


export function useGetDoctorBookings() {
  const token = useAuthStore.getState().token;

  return useQuery({
    queryKey: ["doctor-bookings"],
    queryFn: async () => {
      const res = await instance.get("/bookings/doctor/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!token,
  });
}


export function useGetDoctorTotalBookings() {
  const token = useAuthStore.getState().token;

  return useQuery({
    queryKey: ["doctor-total-bookings"],
    queryFn: async () => {
      const res = await instance.get(`/bookings/doctor/total-bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!token,
  });
}
