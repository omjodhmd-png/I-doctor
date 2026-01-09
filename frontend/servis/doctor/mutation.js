import { useMutation, useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { instance } from "../../servis/instance.js"; // افترض أن هاد instance معمول مسبقاً

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData) => {
      // جلب التوكن
      const token = await AsyncStorage.getItem("token");

      // إرسال البيانات للخادم
      const res = await instance.post("/bookings", bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data; // ترجاع البيانات من الخادم
    },
    onSuccess: () => {
      // بعد نجاح الحجز، نجدد قائمة الحجوزات
      queryClient.invalidateQueries(["myBookings"]);
    },
  });
};
