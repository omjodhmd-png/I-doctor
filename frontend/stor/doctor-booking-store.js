import { create } from "zustand";
import useAuthStore from "./login-store.js";
import { instance } from "../servis/instance.js";

const useDoctorBookingStore = create((set, get) => ({
  // 📦 state
  bookings: [],
  loading: false,
  error: null,

  // ✅ تحميل bookings ديال الطبيب
  loadDoctorBookings: async () => {
    try {
      set({ loading: true, error: null });

      const { token, user } = useAuthStore.getState();
      if (!token || user?.role !== "doctor") {
        throw new Error("Doctor not authenticated");
      }

      const res = await instance.get(
        "/bookings/doctor/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({ bookings: res.data, loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || err.message,
      });
    }
  },

  // ✅ Confirm booking (doctor)
  confirmBooking: async (bookingId) => {
    try {
      set({ loading: true, error: null });

      const { token } = useAuthStore.getState();
      if (!token) throw new Error("Doctor not authenticated");

      const res = await instance.put(
        `/bookings/${bookingId}/status`,
        { status: "Confirmed" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // تحديث محلي
      set((state) => ({
        bookings: state.bookings.map((b) =>
          b.id === bookingId ? res.data.booking : b
        ),
        loading: false,
      }));
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || err.message,
      });
      throw err;
    }
  },

  // ❌ Cancel booking (doctor)
  cancelBooking: async (bookingId) => {
    try {
      set({ loading: true, error: null });

      const { token } = useAuthStore.getState();
      if (!token) throw new Error("Doctor not authenticated");

      const res = await instance.put(
        `/bookings/${bookingId}/status`,
        { status: "Cancelled" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      set((state) => ({
        bookings: state.bookings.map((b) =>
          b.id === bookingId ? res.data.booking : b
        ),
        loading: false,
      }));
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || err.message,
      });
      throw err;
    }
  },
}));

export default useDoctorBookingStore;
