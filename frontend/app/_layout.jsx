import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import useAuthStore from "../stor/login-store.js"; // بدّل path حسب المشروع ديالك

const queryClient = new QueryClient();

export default function Layout() {
  const { loadAuth, loading } = useAuthStore();
  

  useEffect(() => {
    loadAuth();
  
  }, []);

  // ⛔ مهم بزاف: ما تخليش Stack يتحمّل حتى auth يكون واجد
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
        <Stack.Screen name="(doctor)" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
