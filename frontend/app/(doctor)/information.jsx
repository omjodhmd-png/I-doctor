import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useCreateDoctor } from "../../servis/doctor/mutation.js";
import  useCreateDoctorStore  from "../../stor/register-store.js";
import Input from "../../components/input.jsx";
import TextArea from "../../components/textArea.jsx";

export default function DoctorInfoScreen() {
  const { doctor, setDoctorField, resetDoctor } = useCreateDoctorStore();
  const createDoctor = useCreateDoctor();

  const handleSubmit = () => {
    if (!doctor?.fullName || !doctor?.speciality || !doctor?.workTime) {
      return alert("Please fill required fields");
    }
  
    if (!doctor.latitude || !doctor.longitude) {
      return alert("Please choose location on map 📍");
    }
  
    createDoctor.mutate(
      {
        ...doctor,
  
        experience: doctor.experience
          ? Number(doctor.experience)
          : null,
  
        consultationDuration: doctor.consultationDuration
          ? Number(doctor.consultationDuration)
          : null,
  
        price: doctor.price
          ? Number(doctor.price)
          : null,
  
        latitude: Number(doctor.latitude),
        longitude: Number(doctor.longitude),
      },
      {
        onSuccess: () => {
          alert("Doctor profile created successfully ");
          resetDoctor();
          router.replace("/(tabs)/dashbord");
        },
        onError: (error) => {
          console.log(error);
          alert(error?.message || "Something went wrong");
        },
      }
    );
  };
  
  return (
    <LinearGradient colors={["#eaf6ff", "#ffffff"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>Doctor Information</Text>

            <Input label="Full Name" value={doctor?.fullName} onChange={(v) => setDoctorField("fullName", v)} />
            <Input label="Speciality" value={doctor?.speciality} onChange={(v) => setDoctorField("speciality", v)} />
            <Input label="Clinic Name" value={doctor?.clinicName} onChange={(v) => setDoctorField("clinicName", v)} />

            <TextArea label="Bio" value={doctor?.bio} onChange={(v) => setDoctorField("bio", v)} />

            <Input label="Experience (years)" value={doctor?.experience} keyboard="numeric" onChange={(v) => setDoctorField("experience", v)} />

            <Input label="Languages (Arabic, French...)" value={doctor?.languages} onChange={(v) => setDoctorField("languages", v)} />

            <Input label="Work Time" value={doctor?.workTime} onChange={(v) => setDoctorField("workTime", v)} />
            <Input label="Availability Days" value={doctor?.availabilityDays} onChange={(v) => setDoctorField("availabilityDays", v)} />
            <Input label="Consultation Duration (min)" value={doctor?.consultationDuration} keyboard="numeric" onChange={(v) => setDoctorField("consultationDuration", v)} />

            <Input label="Phone" value={doctor?.phone} keyboard="phone-pad" onChange={(v) => setDoctorField("phone", v)} />
            <Input label="Price" value={doctor?.price} keyboard="numeric" onChange={(v) => setDoctorField("price", v)} />

            <Input label="Address" value={doctor?.address} editable={false} />

            <TouchableOpacity style={styles.mapButton} onPress={() => router.push("/map")}>
              <Text style={styles.buttonText}>Choose Location on Map</Text>
            </TouchableOpacity>

            <TextArea label="Certifications" value={doctor?.certifications} onChange={(v) => setDoctorField("certifications", v)} />

            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>
                {createDoctor.isLoading ? "Saving..." : "Save Information"}
              </Text>
            </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}




const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 20,
  },

  mapButton: {
    backgroundColor: "#34C759",
    height: 55,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },

  saveButton: {
    backgroundColor: "#0A84FF",
    height: 55,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
``
