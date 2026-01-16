import { QueryClient,  QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StackScreen } from "react-native-screens";



 const queryClient = new QueryClient();

export default function Layout() {
  return (
    <Stack>
     
      <Stack.Screen name="information" options={{headerShown:false}}/>
      <Stack.Screen name="map" options={{headerShown:false}}/>
      <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
      <Stack.Screen name="booking-details/[id]" options={{headerShown:false}}/>


      


    

     </Stack>
  );
}

