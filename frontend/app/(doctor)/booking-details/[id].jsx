import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useAuthStore from "../../../stor/login-store.js";

import { useGetBookingDetails } from "../../../servis/booking/query.js";
import { useUpdateBookingStatus } from "../../../servis/booking/mutation.js";

const { width } = Dimensions.get("window");

export default function BookingDetailsDoctorScreen() {
  const router = useRouter();
  const { bookingId } = useLocalSearchParams();
  const bookingIdNum = Number(bookingId);

  const { user } = useAuthStore();

  const { data: booking, isLoading, isError } = useGetBookingDetails(bookingIdNum);


  const updateStatusMutation = useUpdateBookingStatus();


  const handleUpdateStatus = (status) => {
    const actionText = status === "Confirmed" ? "Confirm" : "Cancel";
    
    Alert.alert(
      "Confirm Action",
      `Are you sure you want to ${actionText} this booking?`,
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            updateStatusMutation.mutate(
              { bookingId: bookingIdNum, status },
              {
                onSuccess: () => {
                  Alert.alert("Success", `Booking has been ${status.toLowerCase()}ed.`);
                },
                onError: (err) => {
                  Alert.alert("Error", err.response?.data?.message || "Update failed");
                },
              }
            );
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0A84FF" />
      </View>
    );
  }

  if (isError || !booking) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle" size={50} color="#FF3B30" />
        <Text style={styles.errorText}>Booking not found or error occurred.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={{ color: "#fff" }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isPending = booking.status === "Pending";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.roundBtn}>
          <Ionicons name="arrow-back" size={24} color="#0A84FF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.statusSection}>
          <View style={[styles.statusDot, { backgroundColor: booking.status === "Confirmed" ? "#34C759" : booking.status === "Cancelled" ? "#FF3B30" : "#FF9500" }]} />
          <Text style={styles.statusLabel}>{booking.status}</Text>
        </View>

        {/* Patient Card */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>PATIENT INFO</Text>
          <View style={styles.row}>
            <Ionicons name="person-outline" size={20} color="#666" />
            <Text style={styles.mainValue}>{booking.user?.fullName || "Unknown"}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>APPOINTMENT DETAILS</Text>
          
          <View style={styles.detailRow}>
            <View style={styles.iconBox}>
              <Ionicons name="calendar-outline" size={20} color="#0A84FF" />
            </View>
            <View>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.value}>{booking.bookingDate}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.iconBox}>
              <Ionicons name="time-outline" size={20} color="#0A84FF" />
            </View>
            <View>
              <Text style={styles.label}>Time Slot</Text>
              <Text style={styles.value}>{booking.bookingTime}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.iconBox}>
              <Ionicons name="document-text-outline" size={20} color="#0A84FF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Notes</Text>
              <Text style={styles.value}>{booking.notes || "No notes provided"}</Text>
            </View>
          </View>
        </View>

        {isPending && (
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.confirmBtn]}
              onPress={() => handleUpdateStatus("Confirmed")}
              disabled={updateStatusMutation.isPending}
            >
              {updateStatusMutation.isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Ionicons name="checkmark-circle" size={22} color="#fff" style={{marginRight:8}} />
                  <Text style={styles.buttonText}>Confirm Booking</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.cancelBtn]}
              onPress={() => handleUpdateStatus("Cancelled")}
              disabled={updateStatusMutation.isPending}
            >
              <Text style={[styles.buttonText, { color: "#FF3B30" }]}>Cancel Appointment</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#1E293B" },
  roundBtn: { backgroundColor: "#F0F7FF", padding: 10, borderRadius: 12 },

  scrollContent: { padding: 20 },

  statusSection: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  statusLabel: { fontSize: 13, fontWeight: "bold", color: "#475569" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  sectionLabel: { fontSize: 12, fontWeight: "bold", color: "#94A3B8", marginBottom: 15, letterSpacing: 1 },
  row: { flexDirection: "row", alignItems: "center" },
  mainValue: { fontSize: 18, fontWeight: "bold", marginLeft: 10, color: "#1E293B" },

  detailRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  iconBox: { backgroundColor: "#F0F7FF", padding: 10, borderRadius: 12, marginRight: 15 },
  label: { fontSize: 13, color: "#64748B" },
  value: { fontSize: 15, fontWeight: "600", color: "#1E293B", marginTop: 2 },

  actions: { marginTop: 10 },
  button: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    flexDirection: "row",
  },
  confirmBtn: { backgroundColor: "#0A84FF" },
  cancelBtn: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#FF3B30" },
  buttonText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  
  errorText: { marginTop: 10, color: "#64748B" },
  backBtn: { backgroundColor: "#0A84FF", padding: 12, borderRadius: 10, marginTop: 20 },
});