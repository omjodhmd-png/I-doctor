import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
  Platform,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useGetDoctor } from "../../../servis/doctor/qurey.js";


const { width } = Dimensions.get("window");


export default function DoctorDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: doctor, isLoading, isError } = useGetDoctor(id);

  const openMap = () => {
    if (!doctor?.latitude || !doctor?.longitude) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${doctor.latitude},${doctor.longitude}`;
    Linking.openURL(url);
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0A84FF" />
      </View>
    );
  }

  if (isError || !doctor) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Doctor not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
    
        <View style={{ width, height: width * 1.4 }}>
          <ImageBackground
            source={{ uri: doctor.imageUrl }}
            style={styles.image}
          >
         
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>

            <LinearGradient
              colors={["rgba(0,0,0,0.0)", "transparent", "#F9F9F9"]}
              style={styles.gradient}
            />
          </ImageBackground>
        </View>


        <View style={styles.profileHeader}>
          <View>
            <Text style={styles.name}>{doctor.fullName}</Text>
            <Text style={styles.speciality}>{doctor.speciality}</Text>
          </View>

          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>
              {doctor.rating?.toFixed(1) || "5.0"}
            </Text>
          </View>
        </View>

   
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="briefcase-outline" size={22} color="#0A84FF" />
            <Text style={styles.statLabel}>Experience</Text>
            <Text style={styles.statValue}>
              {doctor.experience || "5"}+ Years
            </Text>
          </View>

          <View style={[styles.statItem, styles.statBorder]}>
            <Ionicons name="cash-outline" size={22} color="#0A84FF" />
            <Text style={styles.statLabel}>Price</Text>
            <Text style={styles.statValue}>
              {doctor.price || "---"} MAD
            </Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="people-outline" size={22} color="#0A84FF" />
            <Text style={styles.statLabel}>Patients</Text>
            <Text style={styles.statValue}>1.2K</Text>
          </View>
        </View>

     
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Doctor</Text>
          <Text style={styles.bioText}>
            {doctor.bio || "No information available."}
          </Text>
        </View>

   
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Working Hours</Text>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={20} color="#0A84FF" />
            <Text style={styles.infoRowText}>
              {doctor.workTime}{" "}
              {doctor.availabilityDays
                ? `(${doctor.availabilityDays})`
                : ""}
            </Text>
          </View>
        </View>

  
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.locationCard}>
            <Ionicons name="location-outline" size={22} color="#0A84FF" />
            <Text style={styles.addressText} numberOfLines={2}>
              {doctor.address || "Address not provided"}
            </Text>

            <TouchableOpacity
              style={styles.smallMapBtn}
              onPress={openMap}
            >
              <Text style={styles.smallMapBtnText}>Map</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>


      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => router.push(`/booking/${id}`)}
        >
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", fontSize: 16 },

  image: { width: "100%", height: "100%", resizeMode: "cover" },
  gradient: { flex: 1 },

  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 30,
    left: 20,
    zIndex: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 22,
  },

  profileHeader: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  name: { fontSize: 28, fontWeight: "800", color: "#1A1A1A" },
  speciality: {
    fontSize: 16,
    color: "#0A84FF",
    fontWeight: "600",
    marginTop: 4,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 2,
  },
  ratingText: { marginLeft: 5, fontWeight: "700" },

  statsRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    justifyContent: "space-between",
    marginBottom: 25,
    elevation: 2,
  },
  statItem: { flex: 1, alignItems: "center" },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#EEE",
  },
  statLabel: { fontSize: 12, color: "#888", marginTop: 6 },
  statValue: { fontSize: 16, fontWeight: "700", marginTop: 4 },

  section: { paddingHorizontal: 20, marginBottom: 25 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  bioText: { fontSize: 15, color: "#666", lineHeight: 24 },

  infoRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  infoRowText: { fontSize: 15, color: "#444" },

  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 18,
    gap: 10,
  },
  addressText: { flex: 1, fontSize: 14, color: "#666" },
  smallMapBtn: {
    backgroundColor: "#EAF4FF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  smallMapBtnText: {
    color: "#0A84FF",
    fontWeight: "700",
    fontSize: 12,
  },

  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  bookButton: {
    backgroundColor: "#0A84FF",
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
    elevation: 8,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
