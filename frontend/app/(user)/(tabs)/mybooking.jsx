// screens/my-bookings.js
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useBookingStore from "../../../stor/booking-store.js";
import moment from "moment";

export default function MyBookingsScreen() {
  const router = useRouter();
  const { bookings, loading, error, loadBookings, cancelBooking } =useBookingStore();

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = (bookingId) => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this booking?",
      [
        { text: "No" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await cancelBooking(bookingId);
              Alert.alert("Booking cancelled successfully ✅");
            } catch (err) {
              Alert.alert(err.message || "Failed to cancel booking ❌");
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Doctor:</Text>
        <Text style={styles.value}>{item.Doctor?.fullName || "Unknown"}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>
          {moment(item.bookingDate).format("MMM DD, YYYY")}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>{item.bookingTime}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Status:</Text>
        <Text style={[styles.value, { color: "#0A84FF" }]}>{item.status}</Text>
      </View>

      {item.status === "Pending" && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => handleCancel(item.id)}
        >
          <Text style={styles.cancelButtonText}>Cancel Booking</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={24} color="#0A84FF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Bookings</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* محتوى الحجوزات */}
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0A84FF" />
        </View>
      ) : error ? (
        <View style={styles.loading}>
          <Text style={{ color: "#0A84FF", fontWeight: "600" }}>{error}</Text>
        </View>
      ) : bookings.length === 0 ? (
        <View style={styles.loading}>
          <Text style={{ fontSize: 16, color: "#0A84FF" }}>
            You have no bookings yet.
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16, paddingBottom: 30 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    shadowColor: "#0A84FF",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E6F0FF",
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#0A84FF" },

  loading: { flex: 1, justifyContent: "center", alignItems: "center" },

  // Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#0A84FF",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: { fontSize: 14, color: "#000" },
  value: { fontSize: 16, fontWeight: "600", color: "#000" },

  cancelButton: {
    marginTop: 12,
    backgroundColor: "#0A84FF",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
