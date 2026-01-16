import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import useAuthStore from "../../../stor/login-store.js";
import {
  useGetDoctorBookings,
  useGetDoctorTotalBookings,
} from "../../../servis/booking/query.js";

const { width, height } = Dimensions.get("window");

export default function DoctorDashboardScreen() {
  const router = useRouter();
  const { user } = useAuthStore();

  /* 🔹 جلب إجمالي الحجوزات */
  const { 
    data: totalData, 
    isLoading: totalLoading 
  } = useGetDoctorTotalBookings();

  /* 🔹 جلب قائمة الحجوزات (Sorted) */
  const {
    data: bookingsData,
    isLoading: bookingsLoading,
    isError: bookingsError,
    refetch, // تقدر تستعملها يلا بغيتي تدير Pull to Refresh
  } = useGetDoctorBookings();

  const totalBookings = totalData?.totalBookings || 0;

  /* 🔹 تصميم كل حجز في القائمة */
  const renderBooking = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.bookingCard}
        activeOpacity={0.8}
        onPress={() =>
          router.push({
            pathname: "/booking-details/[id]",
            params: { bookingId: item.id },
          })
        }
      >
        <View style={styles.bookingInfo}>
          <View style={styles.iconBadge}>
            <Ionicons name="person" size={20} color="#0A84FF" />
          </View>
          <View style={styles.textDetails}>
            <Text style={styles.patientName}>
              {item.user?.fullName || "Unknown Patient"}
            </Text>
            <Text style={styles.bookingDate}>
              {item.bookingDate} • {item.bookingTime}
            </Text>
          </View>
        </View>

        <View style={styles.statusBadge}>
          <Text
            style={[
              styles.statusText,
              {
                color:
                  item.status === "Confirmed"
                    ? "#34C759"
                    : item.status === "Cancelled"
                    ? "#FF3B30"
                    : "#FF9500",
              },
            ]}
          >
            {item.status}
          </Text>
          <Ionicons name="chevron-forward" size={18} color="#CCC" />
        </View>
      </TouchableOpacity>
    );
  };

  /* 🔹 حالات التحميل والخطأ */
  if (totalLoading || bookingsLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0A84FF" />
        <Text style={{ marginTop: 10, color: "#666" }}>Loading Dashboard...</Text>
      </View>
    );
  }

  if (bookingsError) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle" size={50} color="red" />
        <Text style={{ marginTop: 10 }}>Error loading bookings</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={{ color: "#fff" }}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome, Dr.</Text>
          <Text style={styles.headerTitle}>{user?.fullName || "Doctor"}</Text>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <Ionicons name="notifications" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Stats Card */}
      <View style={styles.totalBookingsContainer}>
        <View style={styles.statsIconBox}>
          <Ionicons name="calendar" size={30} color="#0A84FF" />
        </View>
        <Text style={styles.totalBookingsValue}>{totalBookings}</Text>
        <Text style={styles.totalBookingsLabel}>Total Appointments</Text>
      </View>

      {/* Bookings List */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Bookings</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={bookingsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBooking}
        scrollEnabled={false} // حيت دايرين ScrollView برا
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No bookings found today.</Text>
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  header: {
    backgroundColor: "#0A84FF",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  welcomeText: { color: "#E0EFFF", fontSize: 14 },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  notifBtn: { backgroundColor: "rgba(255,255,255,0.2)", padding: 8, borderRadius: 12 },

  totalBookingsContainer: {
    width: width * 0.9,
    backgroundColor: "#fff",
    alignSelf: "center",
    marginTop: -25, // باش يجي طالع فوق الـ header شوية
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  statsIconBox: { backgroundColor: "#F0F7FF", padding: 12, borderRadius: 50 },
  totalBookingsValue: { fontSize: 32, fontWeight: "bold", marginTop: 8, color: "#111" },
  totalBookingsLabel: { fontSize: 14, color: "#666", fontWeight: "500" },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#1E293B" },
  seeAll: { color: "#0A84FF", fontWeight: "600" },

  bookingCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 15,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  bookingInfo: { flexDirection: "row", alignItems: "center", flex: 1 },
  iconBadge: { backgroundColor: "#F0F7FF", padding: 10, borderRadius: 12, marginRight: 12 },
  textDetails: { flex: 1 },
  patientName: { fontSize: 16, fontWeight: "bold", color: "#1E293B" },
  bookingDate: { fontSize: 13, color: "#64748B", marginTop: 2 },

  statusBadge: { flexDirection: "row", alignItems: "center" },
  statusText: { fontSize: 12, fontWeight: "bold", marginRight: 5 },

  retryButton: { backgroundColor: "#0A84FF", padding: 10, borderRadius: 8, marginTop: 15 },
  emptyText: { textAlign: "center", marginTop: 20, color: "#94A3B8" },
});