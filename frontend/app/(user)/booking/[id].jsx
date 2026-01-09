import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import { useCreateBooking } from "../../../servis/booking/mutation.js"; // mutation اللي درنا
import moment from "moment";

export default function BookingScreen() {
  const { id: doctorId, name: doctorName } = useLocalSearchParams();
  console.log("Booking doctorId:", doctorId, "parsed:", parseInt(doctorId));
  console.log("useLocalSearchParams:", useLocalSearchParams());

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const createBookingMutation = useCreateBooking();

  const handleBooking = () => {
    createBookingMutation.mutate(
      {
        doctorId: parseInt(doctorId, 10), // نتأكد أنه رقم
        bookingDate: moment(date).format("YYYY-MM-DD"),
        bookingTime: moment(time).format("HH:mm"),
        notes,
      },
      {
        onSuccess: () => {
          alert("Booking confirmed successfully! ✅");
          router.push("/home");
          
        },
        onError: (err) => {
          alert(err.response?.data?.message || "Failed to create booking");
        },
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Content */}
      <View style={styles.card}>
        {/* Doctor */}
        <Text style={styles.label}>Doctor</Text>
        <Text style={styles.value}>{doctorName}</Text>

        {/* Date */}
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDate(true)}
        >
          <Ionicons name="calendar" size={20} color="#0A84FF" />
          <Text style={styles.inputText}>
            {moment(date).format("YYYY-MM-DD")}
          </Text>
        </TouchableOpacity>

        {/* Time */}
        <Text style={styles.label}>Time</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowTime(true)}
        >
          <Ionicons name="time" size={20} color="#0A84FF" />
          <Text style={styles.inputText}>{moment(time).format("HH:mm")}</Text>
        </TouchableOpacity>

        {/* Notes */}
        <Text style={styles.label}>Notes (optional)</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Write your notes..."
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        {/* Button */}
        <TouchableOpacity
          style={[
            styles.button,
            createBookingMutation.isLoading && { opacity: 0.6 },
          ]}
          onPress={handleBooking}
          disabled={createBookingMutation.isLoading}
        >
          {createBookingMutation.isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Confirm Booking</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Pickers */}
      {showDate && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(e, selectedDate) => {
            setShowDate(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      {showTime && (
        <DateTimePicker
          value={time}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(e, selectedTime) => {
            setShowTime(false);
            if (selectedTime) setTime(selectedTime);
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },

  header: {
    backgroundColor: "#0A84FF",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },

  card: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 16,
    padding: 16,
    elevation: 4,
  },

  label: { fontSize: 14, color: "#666", marginTop: 12, marginBottom: 4 },
  value: { fontSize: 16, fontWeight: "bold", color: "#111" },

  input: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 12,
    gap: 10,
  },
  inputText: { fontSize: 16, color: "#111" },

  textArea: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 12,
    minHeight: 80,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#0A84FF",
    marginTop: 20,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
