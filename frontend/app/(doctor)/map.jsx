import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { router } from "expo-router";
import useCreateDoctorStore from "../../stor/register-store";
import useAuthStore from "../../stor/login-store.js";

export default function MapScreen() {
  const { doctor, setDoctorField } = useCreateDoctorStore()
  const { token } = useAuthStore()
  console.log(token);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 33.5731,
          longitude: -7.5898,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={(e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          console.log("Latitude: ", latitude);
          console.log("Longitude: ", longitude);
          setDoctorField("longitude", Number(e.nativeEvent.coordinate.longitude))
          setDoctorField("latitude", Number(e.nativeEvent.coordinate.latitude))
        }}
      >
        {doctor?.latitude && doctor?.longitude && <Marker coordinate={{ latitude: doctor.latitude, longitude: doctor.longitude }} />}
      </MapView>

      <TouchableOpacity
        style={styles.confirm}
        onPress={() => {
          if (!doctor?.longitude) return alert("Please select a location");

          router.back();
          router.setParams({
            latitude: doctor.latitude,
            longitude: doctor.longitude,
            address: `Lat: ${doctor.latitude}, Lng: ${doctor.longitude}`,
          });
        }}
      >
        <Text style={styles.text}>Confirm Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  confirm: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#0A84FF",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
