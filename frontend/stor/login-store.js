import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthStore = create((set) => ({
  token: null,
  role: null,
  user: null,
  loading: true,

  loadAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userStr = await AsyncStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;

      set({
        token: token || null,
        role: user?.role || null,
        user: user || null,
        loading: false,
      });
    } catch (error) {
      console.error("Failed to load auth:", error);
      set({ token: null, role: null, user: null, loading: false });
    }
  },


  setAuth: async ({ token, user }) => {
    try {
      if (token != null) { 
        await AsyncStorage.setItem("token", token);
      } else {
        await AsyncStorage.removeItem("token");
      }

      if (user != null) {
        await AsyncStorage.setItem("user", JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem("user");
      }

      set({
        token: token || null,
        role: user?.role || null,
        user: user || null,
      });
    } catch (error) {
      console.error("Failed to set auth:", error);
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      set({ token: null, role: null, user: null });
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  },
}));

export default useAuthStore;
