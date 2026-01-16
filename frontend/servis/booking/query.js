import { instance } from "../instance.js";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../stor/login-store.js";

// جلب تفاصيل حجز واحد (مهم بزاف لصفحة الـ Details)
export const useGetBookingDetails = (bookingId) => {
  const token = useAuthStore.getState().token;

  return useQuery({
    queryKey: ["booking-details", Number(bookingId)], // توحيد الـ ID كـ Number
    queryFn: async () => {
      const res = await instance.get(`/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!bookingId && !!token,
  });
};

// جلب قائمة الحجوزات (نقدروا نسميوها Sorted يلا كان الـ Backend كيرجعهم مرتبين)
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

// جلب إحصائيات أو مجموع الحجوزات
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
