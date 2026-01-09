import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import useFavoriteStore from "../../../stor/favorite-store.js";
import { useGetAllDoctors } from "../../../servis/doctor/qurey.js";

const { width } = Dimensions.get("window");

// Icons Mapping
const categoryIcons = {
  Cardiologist: "heart-pulse",
  Dermatologist: "face-man-profile",
  Dentist: "tooth-outline",
  Gynecologist: "head-cog-outline",
  Orthopedic: "bone",
  Pediatrician: "baby-face",
};

export default function HomeScreen() {
  const { favorites, toggleFavorite } = useFavoriteStore();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data: doctors, isLoading, isError, refetch } = useGetAllDoctors(selectedCategory);

  const categories = Object.keys(categoryIcons);

  // دالة لتنظيف البيانات وتجنب الأخطاء
  const cleanDoctorsData = Array.isArray(doctors) ? doctors.filter(doc => doc !== null && doc !== undefined) : [];

  const renderDoctorItem = ({ item }) => {
    // حماية إضافية داخل Render
    if (!item) return null;

    const isFav = favorites?.includes(item.id);
    const speciality = item.speciality || "Doctor";
    const iconName = categoryIcons[speciality] || "doctor";

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
          <ImageBackground
            source={{ uri: item.imageUrl }}
            style={styles.cardImage}
            imageStyle={styles.cardImageInner}
          />
        ) : (
          <View style={[styles.cardImage, styles.placeholderImage]}>
            <Ionicons name="person" size={36} color="#ccc" />
          </View>
        )}

        <View style={styles.cardInfo}>
          <Text style={styles.cardName} numberOfLines={1}>
            {item.fullName || "Unknown"}
          </Text>
          <View style={styles.cardSpecialityRow}>
            <MaterialCommunityIcons
              name={iconName}
              size={12}
              color="#0A84FF"
            />
            <Text style={styles.cardJob} numberOfLines={1}>{speciality}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ===== Header ===== */}
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>Hi,</Text>
          <Text style={styles.title}>Find Your Doctor</Text>
        </View>

        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => router.push("/search")}
          >
            <Ionicons name="search-outline" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ===== Categories ===== */}
      <View style={styles.sectionContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        >
          {categories.map((item) => {
            const isSelected = selectedCategory === item;
            return (
              <TouchableOpacity
                key={item}
                style={styles.categoryItem}
                onPress={() => setSelectedCategory(isSelected ? null : item)}
              >
                <View style={[styles.iconBox, isSelected && styles.iconBoxActive]}>
                  <MaterialCommunityIcons
                    name={categoryIcons[item]}
                    size={26}
                    color={isSelected ? "#fff" : "#0A84FF"}
                  />
                </View>
                <Text style={styles.categoryText}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* ===== Doctors List ===== */}
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <Text style={styles.sectionTitle}>
          {selectedCategory ? `${selectedCategory} Specialists` : "All Doctors"}
        </Text>

        {isLoading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#0A84FF" />
          </View>
        ) : isError ? (
          <View style={styles.center}>
            <Text style={{ color: 'red' }}>Error fetching doctors</Text>
            <TouchableOpacity onPress={() => refetch()} style={{ marginTop: 10 }}>
              <Text style={{ color: '#0A84FF' }}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={cleanDoctorsData}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={renderDoctorItem}
            ListEmptyComponent={
              <View style={styles.center}>
                <Text style={{ color: '#aaa', marginTop: 20 }}>No doctors found in this category.</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

/* ===== Styles (معدلة قليلاً لتناسب التصميم الجديد) ===== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FC" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    backgroundColor: "#0A84FF",
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  hello: { color: "#D1E5FF", fontSize: 13 },
  title: { color: "#fff", fontSize: 21, fontWeight: "bold" },
  headerIcons: { flexDirection: "row", gap: 10 },
  iconBtn: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 10,
  },
  sectionContainer: { marginVertical: 16 },
  categoriesList: { paddingHorizontal: 15 },
  categoryItem: { alignItems: "center", marginRight: 14 },
  iconBox: {
    backgroundColor: "#fff",
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  iconBoxActive: { backgroundColor: "#0A84FF" },
  categoryText: { marginTop: 5, fontSize: 11, color: "#333", fontWeight: '500' },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    marginLeft: 6,
  },
  card: {
    backgroundColor: "#fff",
    width: width / 2 - 24,
    margin: 8,
    borderRadius: 16,
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  favoriteBadge: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 1,
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 4,
    borderRadius: 10,
  },
  cardImage: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
    overflow: "hidden",
  },
  cardImageInner: { resizeMode: "cover" },
  placeholderImage: { backgroundColor: "#F0F0F0", justifyContent: "center", alignItems: "center" },
  cardInfo: { paddingHorizontal: 2 },
  cardName: { fontWeight: "bold", fontSize: 13, color: "#333" },
  cardSpecialityRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  cardJob: { fontSize: 11, color: "#777", marginLeft: 4, flex: 1 },
});