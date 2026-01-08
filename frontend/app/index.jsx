import { Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect } from "react";
import { useRouter } from "expo-router";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";

export default function SplashScreen() {
  const router = useRouter();

  const rotation = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(40);
  const scale = useSharedValue(2);

  useEffect(() => {
    rotation.value = withTiming(1, { duration: 2000 });
    scale.value = withSpring(1);
    textOpacity.value = withTiming(1, { duration: 1200, delay: 300 });
    textTranslateY.value = withSpring(0, { damping: 12, stiffness: 180 });

    const timer = setTimeout(() => {
      router.replace("/register");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value * 360 * 2}deg` },
      { scale: scale.value },
    ],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  return (
    <LinearGradient colors={["#eaf6ff", "#ffffff", "#a6d8ff"]} style={styles.container}>
      <Animated.View style={[styles.logo, animatedStyle]}>
        <FontAwesome5 name="briefcase-medical" size={60} color="#1e90ff" />
      </Animated.View>

      <Animated.View style={[textAnimatedStyle]}>
        <Text style={styles.title}>Doctor Hunt</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  logo: {
    marginBottom: 15,
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a6d8ff",
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#111" },
});
