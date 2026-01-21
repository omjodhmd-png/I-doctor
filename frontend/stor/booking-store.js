import { create } from "zustand";
import useAuthStore from "./login-store.js";
import { instance  } from "../servis/instance.js";

const useBookingStore = create((set, get) => ({
  bookings: [],
  loading: false,
  error: null,

 
  loadBookings: async () => {
    try {
      set({ loading: true, error: null });

      const token = useAuthStore.getState().token;
      if (!token) throw new Error("User not authenticated");

      const res = await instance.get("/bookings/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ bookings: res.data, loading: false });
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || err.message });
    }
  },


  createBooking: async ({ doctorId, bookingDate, bookingTime, notes }) => {
    try {
      set({ loading: true, error: null });

      const token = useAuthStore.getState().token;
      if (!token) throw new Error("User not authenticated");

      const res = await instance.post(
        "/bookings",
        { doctorId, bookingDate, bookingTime, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      
      set((state) => ({
        bookings: [res.data.booking, ...state.bookings],
        loading: false,
      }));

      return res.data.booking;
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || err.message });
      throw err;
    }
  },

  cancelBooking: async (bookingId) => {
    try {
      set({ loading: true, error: null });

      const token = useAuthStore.getState().token;
      if (!token) throw new Error("User not authenticated");

      await instance.patch(`/bookings/${bookingId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      set((state) => ({
        bookings: state.bookings.filter((b) => b.id !== bookingId),
        loading: false,
      }));
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || err.message });
      throw err;
    }
  },
}));

export default useBookingStore;
