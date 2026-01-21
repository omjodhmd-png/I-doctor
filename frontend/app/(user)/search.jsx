import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import debounce from "lodash.debounce";
import useFavoriteStore from "../../stor/favorite-store.js";
import { useGetAllDoctors } from "../../servis/doctor/qurey.js";

const { width } = Dimensions.get("window");

const categoryIcons = {
  Cardiologist: "heart-pulse",
  Dermatologist: "face-man-profile",
  Dentist: "tooth-outline",
  Gynecologist: "head-cog-outline",
  Orthopedic: "bone",
  Pediatrician: "baby-face",
};

export default function SearchScreen() {
  const { favorites, toggleFavorite } = useFavoriteStore();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const changeHandler = useMemo(
    () => debounce((text) => setDebouncedSearch(text), 500),
    []
  );

  const onSearchChange = (text) => {
    setSearch(text);
    changeHandler(text);
  };

  const { data: doctors, isLoading, isError } = useGetAllDoctors({
    search: debouncedSearch,
  });

  const renderItem = ({ item }) => {
    if (!item) return null;
    const isFav = favorites?.includes(item.id);
    const speciality = item.speciality || "General Doctor";
    const iconName = categoryIcons[item.speciality] || "doctor";

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: "/doctor/[id]",
            params: { id: item.id },
          })
        }
      >
        <TouchableOpacity
          onPress={() => toggleFavorite(item.id)}
          style={styles.favoriteBadge}
        >
          <Ionicons
            name={isFav ? "heart" : "heart-outline"}
            size={18}
            color={isFav ? "#FF3B30" : "#aaa"}
          />
        </TouchableOpacity>

        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
        ) : (
          <View style={[styles.cardImage, styles.placeholderImage]}>
            <Ionicons name="person" size={40} color="#ccc" />
          </View>
        )}

        <View style={styles.cardInfo}>
          <Text style={styles.cardName} numberOfLines={1}>
            {item.fullName}
          </Text>
          <View style={styles.cardSpecialityRow}>
            <MaterialCommunityIcons name={iconName} size={13} color="#0A84FF" />
            <Text style={styles.cardJob} numberOfLines={1}>
              {speciality}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0A84FF" />
        </TouchableOpacity>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#777" />
          <TextInput
            placeholder="Search for a doctor..."
            style={styles.input}
            value={search}
            onChangeText={onSearchChange}
            autoFocus={true}
          />
        </View>
      </View>


      {debouncedSearch.length === 0 ? (
   
        <View style={styles.centered}>
          <Ionicons name="search-outline" size={80} color="#E0E0E0" />
          <Text style={{ color: "#AAA", marginTop: 10, fontSize: 16 }}>
            Start typing to find doctors
          </Text>
        </View>
      ) : isLoading ? (
    
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0A84FF" />
        </View>
      ) : (
    
        <FlatList
          data={doctors || []}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text style={{ color: "#777" }}>No doctors found for "{debouncedSearch}"</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FC" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    elevation: 2,
  },
  backBtn: { marginRight: 12 },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F2F5",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 45,
  },
  input: { flex: 1, marginLeft: 8, fontSize: 16, color: "#333" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  listContainer: { padding: 8 },
  card: {
    backgroundColor: "#fff",
    width: width / 2 - 20,
    margin: 10,
    borderRadius: 16,
    padding: 12,
    elevation: 4,
  },
  favoriteBadge: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 1,
    backgroundColor: "rgba(255,255,255,0.85)",
    padding: 5,
    borderRadius: 10,
  },
  cardImage: { width: "100%", height: 120, borderRadius: 12, marginBottom: 10 },
  placeholderImage: { backgroundColor: "#F0F2F5", justifyContent: "center", alignItems: "center" },
  cardName: { fontWeight: "bold", fontSize: 14, color: "#333" },
  cardSpecialityRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  cardJob: { fontSize: 11, color: "#777", marginLeft: 4, flex: 1 },
});