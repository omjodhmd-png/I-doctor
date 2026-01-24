import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "../instance.js";

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bookingId, status }) => {
      const res = await instance.patch(`/bookings/${bookingId}/status`, { status });
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["booking-details", Number(variables.bookingId)] });
      queryClient.invalidateQueries({ queryKey: ["doctor-bookings"] });
      queryClient.invalidateQueries({ queryKey: ["doctor-total-bookings"] });
    },
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData) => {
      const res = await instance.post("/bookings", bookingData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
    },
  });
};
