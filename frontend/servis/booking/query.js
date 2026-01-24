import { instance } from "../instance.js";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../stor/login-store.js";

export const useGetBookingDetails = (bookingId) => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["booking-details", Number(bookingId)],
    queryFn: async () => {
      const res = await instance.get(`/bookings/${bookingId}`);
      return res.data;
    },
    enabled: !!bookingId && !!token,
  });
};

export function useGetDoctorBookings() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["doctor-bookings"],
    queryFn: async () => {
      const res = await instance.get("/bookings/doctor");
      return res.data;
    },
    enabled: !!token,
  });
}

export function useGetDoctorTotalBookings() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["doctor-total-bookings"],
    queryFn: async () => {
      const res = await instance.get(`/bookings/doctor/total-bookings`);
      return res.data;
    },
    enabled: !!token,
  });
}
