import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useAuthStore from "../../../stor/login-store.js";
import { useGetDoctorTotalBookings, useGetDoctorConfirmedToday } from "../../../servis/booking/query.js";




const { width , height } = Dimensions.get("window");

export default function DoctorDashboardScreen() {

  const { user } = useAuthStore(); 
  const doctorId = user?.id;
  
  const {
    data: totalBookingsData,
    isLoading: totalLoading,
  } = useGetDoctorTotalBookings(doctorId);
    const totalBookings =  totalBookingsData?.totalBookings || 0;

  
const {
  data: confirmedTodayData,
  isLoading: confirmedLoading,
} = useGetDoctorConfirmedToday(doctorId);
const confirmedToday = confirmedTodayData?.confirmedToday || 0;

  const stats = [
    {
      title: "Total Appointments",
      value: totalLoading ? "..." : totalBookings,
      icon: "calendar",
    },
    
    { title: "Confirmed Today",
    value: confirmedLoading ? "..." : confirmedToday,      icon: "checkmark-done" },


    { title: "Pending / Cancelled", value: 3, icon: "alert-circle" },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patient: "John Doe",
      date: "10 Jan 2026",
      time: "09:00",
      status: "Pending",
    },
    {
      id: 2,
      patient: "Sarah Ali",
      date: "10 Jan 2026",
      time: "10:00",
      status: "Confirmed",
    },
    {
      id: 3,
      patient: "Khalid Ben",
      date: "10 Jan 2026",
      time: "11:00",
      status: "Cancelled",
    },
  ];

  const quickActions = [
    { title: "Add Notes", icon: "document-text" },
    { title: "Patient History", icon: "book" },
    { title: "Settings", icon: "settings" },
  ];

  const renderAppointment = ({ item }) => {
    let statusColor;
    switch (item.status) {
      case "Confirmed":
        statusColor = "#0A84FF";
        break;
      case "Pending":
        statusColor = "#FFA500";
        break;
      case "Cancelled":
        statusColor = "#FF3B30";
        break;
    }

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

      {/* Stats */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Ionicons name={stat.icon} size={28} color="#0A84FF" />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </View>
        ))}
      </View>

      {/* Upcoming Appointments */}
      <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
      <FlatList
        data={upcomingAppointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAppointment}
        scrollEnabled={false}
      />

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsContainer}>
        {quickActions.map((action, index) => (
          <TouchableOpacity key={index} style={styles.actionCard}>
            <Ionicons name={action.icon} size={28} color="#0A84FF" />
            <Text style={styles.actionText}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  header: {
    backgroundColor: "#0A84FF",
    padding: 16  ,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height:height*0.15
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    marginBottom: 16,
  },
  statCard: {
    width: width * 0.28,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    elevation: 3,
  },
  statValue: { fontSize: 20, fontWeight: "bold", marginTop: 8 },
  statTitle: { fontSize: 12, color: "#666", textAlign: "center" },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
    marginVertical: 8,
    color: "#111",
  },

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
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: { color: "#fff", fontWeight: "bold", fontSize: 12 },

  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  actionCard: {
    backgroundColor: "#fff",
    width: width * 0.28,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  actionText: { marginTop: 8, fontSize: 12, fontWeight: "bold", textAlign: "center" },
});
