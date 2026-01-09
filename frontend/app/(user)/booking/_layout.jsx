import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
        <Stack.Screen name="doctor/[id]" options={{headerShown:false}}/>
        <Stack.Screen name="booking/[id]" options={{headerShown:false}}/>
        <Stack.Screen name="search" options={{headerShown:false}}/>

        </Stack>
            
        
    )}