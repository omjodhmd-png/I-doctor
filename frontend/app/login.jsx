import  { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useLogin } from "../servis/login/mutaion.js";
import useAuthStore from "../stor/login-store.js";

export default function LoginScreen() {
  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = () => {
    if (!email || !password) {
      return alert("Email and password required");
    }

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          console.log("LOGIN RESPONSE 👉", data);

          setAuth({ token: data.token, user: data.user, role: data.role }); // save role too
          console.log(data.user.role)
          if (data.role === "doctor") {
            router.replace("/(doctor)/(tabs)/dashbord");
          } else {
            router.replace("/(user)/(tabs)/home");
          }
        },
        onError: (err) => {
          alert(err?.response?.data?.message || "Login failed");
        },
      }
    );
  };

  return (
    <LinearGradient
      colors={["#eaf6ff", "#ffffff", "#a6d8ff"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Login to continue and access your account
        </Text>

        <View style={styles.inputBox}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputBox}>
          <TextInput
            placeholder="Password"
            secureTextEntry={secure}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.eye}
            onPress={() => setSecure(!secure)}
          >
            <Ionicons
              name={secure ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>
            {loginMutation.isLoading ? "Logging in..." : "Log in"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.signupText}>
            Don't have an account?
            <Text style={styles.signupLink}> Sign up</Text>
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#0A2540",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 30,
  },

  inputBox: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },

  eye: {
    marginLeft: 10,
  },

  button: {
    backgroundColor: "#0A84FF",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#0A84FF",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  signupText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    color: "#6B7280",
  },

  signupLink: {
    color: "#0A84FF",
    fontWeight: "600",
  },
});
