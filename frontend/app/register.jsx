
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useCreatUser } from "../servis/register/motation.js";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import useAuthStore from "../stor/login-store.js";



export default function SignupScreen() {
  const [secure, setSecure] = useState(true);
  const [agree, setAgree] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  
  const router = useRouter();

  const creatUser = useCreatUser();
  
  const setAuth = useAuthStore((state) => state.setAuth); 
   
  
  
  const handleRegister = () => {
    if (!agree) return alert("You must agree to terms");
  
    creatUser.mutate(
      { fullName, email, password, role },
      {
        onSuccess: (data) => {
          console.log("REGISTER RESPONSE 👉", data);
  
          if (data.token && data.user) {
            // Correct object format
            setAuth({
              token: data.token,
              user: { ...data.user, role: data.role },
            });
  
            alert("User registered successfully!");
  
            const userRole = data.user?.role || data.role;
  
            if (userRole === "doctor") {
              router.replace("/(doctor)/information");
            } else {
              router.replace("/(user)/(tabs)/home");
            }
          } else {
            alert("Registration failed: no token/user received");
          }
        },
        onError: (error) => {
          alert(error?.response?.data?.message || "Registration failed");
        },
      }
    );
  };
  
  return (
    <LinearGradient colors={["#eaf6ff", "#ffffff", "#a6d8ff"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        
        {/* Title */}
        <Text style={styles.title}>Join us to start searching</Text>
        <Text style={styles.subtitle}>
          You can search course, apply course and find scholarship for abroad studies
        </Text>
        {/* Role selection */}
        



        {/* Inputs */}
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        <View style={styles.inputBox}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputBox}>
          <TextInput
            placeholder="Password"
            secureTextEntry={secure}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          
          <TouchableOpacity style={styles.eye} onPress={() => setSecure(!secure)}>
            <Ionicons name={secure ? "eye-off-outline" : "eye-outline"} size={20} color="#999" />
          </TouchableOpacity>
        </View>
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              role === "user" && styles.roleActive,
            ]}
            onPress={() => setRole("user")}
          >
            <Text
              style={[
                styles.roleText,
                role === "user" && styles.roleTextActive,
              ]}
            >
              User
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleButton,
              role === "doctor" && styles.roleActive,
            ]}
            onPress={() => setRole("doctor")}
          >
            <Text
              style={[
                styles.roleText,
                role === "doctor" && styles.roleTextActive,
              ]}
            >
              Doctor
            </Text>
          </TouchableOpacity>
        </View>




        {/* Terms */}
        <TouchableOpacity style={styles.terms} onPress={() => setAgree(!agree)}>
          <View style={[styles.checkbox, agree && styles.checked]} />
          <Text style={styles.termsText}>
            I agree with the Terms of Service & Privacy Policy
          </Text>
        </TouchableOpacity>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>
            {creatUser.isLoading ? "Registering..." : "Sign up"}
          </Text>
        </TouchableOpacity>

        {/* Login */}
        <Text style={styles.loginText}>
          <TouchableOpacity onPress={() => router.push("./login")}>
            <Text style={styles.loginLink}> Log in</Text>
          </TouchableOpacity>
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
}

export const styles = StyleSheet.create({
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  
  roleButton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e6eaf0",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "#fff",
  },
  
  roleActive: {
    backgroundColor: "#0A84FF",
    borderColor: "#0A84FF",
  },
  
  roleText: {
    color: "#6b7c93",
    fontWeight: "500",
  },
  
  roleTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  
  container: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#6b7c93',
    marginBottom: 30,
  },

  inputBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e6eaf0',
    position: 'relative',
  },

  input: {
    fontSize: 15,
    color: '#000',
  },

  eye: {
    position: 'absolute',
    right: 15,
    top: 18,
  },

  terms: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#bbb',
    marginRight: 10,
  },

  checked: {
    backgroundColor: '#0A84FF',
    borderColor: '#0A84FF',
  },

  termsText: {
    fontSize: 12,
    color: '#6b7c93',
    flex: 1,
  },

  button: {
    backgroundColor: '#0A84FF',
    height: 55,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  loginText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#6b7c93',
  },

  loginLink: {
    color: '#0A84FF',
    fontWeight: '600',
  },
});
