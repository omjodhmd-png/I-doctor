import React from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useAuthStore from "../../../stor/login-store.js";
import { useGetDoctorTotalBookings } from "../../../servis/booking/query.js";

const { width, height } = Dimensions.get("window");

export default function DoctorDashboardScreen() {
  const { user } = useAuthStore();
  const doctorId = user?.doctorId;

  const { data } = useGetDoctorTotalBookings(doctorId);
  const totalBookings = data?.totalBookings || 0;

  const upcomingAppointments = [
    { id: 1, patient: "John Doe", date: "10 Jan 2026", time: "09:00", status: "Pending" },
    { id: 2, patient: "Sarah Ali", date: "10 Jan 2026", time: "10:00", status: "Confirmed" },
    { id: 3, patient: "Khalid Ben", date: "10 Jan 2026", time: "11:00", status: "Cancelled" },
  ];

  const renderAppointment = ({ item }) => {
    let statusColor = item.status === "Confirmed" ? "#0A84FF" : item.status === "Pending" ? "#FFA500" : "#FF3B30";

    return (
      <View style={styles.appointmentCard}>
        <View>
          <Text style={styles.patientName}>{item.patient}</Text>
          <Text style={styles.patientDate}>
            {item.date} - {item.time}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="person-circle" size={36} color="#fff" />
        <Text style={styles.headerTitle}>Doctor Dashboard</Text>
        <Ionicons name="notifications" size={28} color="#fff" />
      </View>

      {/* Total Bookings */}
      <View style={styles.totalBookingsContainer}>
        <Ionicons name="calendar" size={28} color="#0A84FF" />
        <Text style={styles.totalBookingsValue}>{totalBookings}</Text>
        <Text style={styles.totalBookingsLabel}>Total Bookings</Text>
      </View>

      {/* Upcoming Appointments */}
      <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
      <FlatList
        data={upcomingAppointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAppointment}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  header: {
    backgroundColor: "#0A84FF",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: height * 0.15,
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },

  totalBookingsContainer: {
    width: width * 0.9,
    backgroundColor: "#fff",
    alignSelf: "center",
    marginTop: 16,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    elevation: 3,
  },
  totalBookingsValue: { fontSize: 32, fontWeight: "bold", marginTop: 8 },
  totalBookingsLabel: { fontSize: 14, color: "#666", marginTop: 4 },

  sectionTitle: { fontSize: 18, fontWeight: "bold", marginLeft: 16, marginVertical: 8, color: "#111" },

  appointmentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    alignItems: "center",
  },
  patientName: { fontSize: 16, fontWeight: "bold", color: "#111" },
  patientDate: { fontSize: 13, color: "#666" },
  statusBadge: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 12 },
  statusText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
});
