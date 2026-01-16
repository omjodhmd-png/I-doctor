import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "../instance.js";
import useAuthStore from "../../stor/login-store.js";

// تحديث حالة الحجز (Confirm/Cancel)
export const useUpdateBookingStatus = () => {
  const token = useAuthStore.getState().token;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bookingId, status }) => {
      const res = await instance.patch(
        `/bookings/${bookingId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: (data, variables) => {
      // تحديث الكاش ديال هاد الحجز بالضبط
      queryClient.invalidateQueries({
        queryKey: ["booking-details", Number(variables.bookingId)],
      });

      // تحديث قائمة الحجوزات العامة للطبيب
      queryClient.invalidateQueries({
        queryKey: ["doctor-bookings"],
      });

      // تحديث الـ Count الإجمالي (يلا تبدل)
      queryClient.invalidateQueries({
        queryKey: ["doctor-total-bookings"],
      });
    },
  });
};

// إنشاء حجز جديد
export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore.getState().token;

  return useMutation({
    mutationFn: async (bookingData) => {
      const res = await instance.post("/bookings", bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
    },
  });
};