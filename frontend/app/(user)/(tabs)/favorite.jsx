import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useGetAllDoctors } from "../../../servis/doctor/qurey.js";
import useFavoriteStore from "../../../stor/favorite-store";
import Animated, { SlideInRight } from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function FavoritesScreen() {
  const { data, isLoading, isError } = useGetAllDoctors();
  const { favorites, toggleFavorite } = useFavoriteStore();

  if (isLoading)
    return <View style={styles.center}><Text>Loading...</Text></View>;

  if (isError)
    return <View style={styles.center}><Text>Error fetching doctors.</Text></View>;

  // filter favorite doctors
  const favoriteDoctors = data.filter((doc) => favorites.includes(doc.id));

  if (favoriteDoctors.length === 0)
    return (
      <View style={styles.center}>
        <Text style={{ color: "#666", fontSize: 16 }}>No favorite doctors yet.</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Doctors</Text>
      <FlatList
        data={favoriteDoctors}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item, index }) => {
          const isFav = favorites.includes(item.id);
          return (
            <Animated.View
              entering={SlideInRight.delay(index * 120)}
              style={styles.card}
            >
              <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.cardName}>{item.fullName}</Text>
                <Text style={styles.cardDesc}>{item.speciality}</Text>
              </View>

              <TouchableOpacity
                onPress={() => toggleFavorite(item.id)}
                style={styles.favoriteIcon}
              >
                <Ionicons
                  name={isFav ? "heart" : "heart-outline"}
                  size={24}
                  color={isFav ? "#FF3B30" : "#aaa"}
                />
              </TouchableOpacity>
            </Animated.View>
          );
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9", paddingTop: 40 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { color: "#1A1A1A", fontSize: 22, fontWeight: "bold", marginLeft: 16, marginBottom: 12 },
  card: { flexDirection: "row", backgroundColor: "#fff", width: width * 0.9, alignSelf: "center", padding: 12, borderRadius: 12, marginBottom: 15, alignItems: "center", position: "relative", elevation: 3 },
  avatar: { width: 55, height: 55, borderRadius: 50, marginRight: 12 },
  cardName: { color: "#1A1A1A", fontSize: 18, fontWeight: "bold" },
  cardDesc: { color: "#555", fontSize: 13, marginTop: 2 },
  price: { color: "#0A84FF", fontWeight: "bold", fontSize: 14 },
  rating: { color: "#FFD700", fontWeight: "bold" },
  favoriteIcon: { position: "absolute", top: 12, right: 12 },
});
