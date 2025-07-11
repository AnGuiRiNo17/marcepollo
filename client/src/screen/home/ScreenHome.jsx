import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function ScreenHome() {
  const rutaDevice = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a tu Hogar Inteligente</Text>

      <View style={styles.headerDecoration} />

      <View style={styles.row}>
        {/* ILUMINACIÓN */}
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Image
              source={{ uri: "https://luanda.es/wp-content/uploads/2024/05/34228-01.jpg" }}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.sectionLabel}>CONTROL</Text>
            <Text style={styles.sectionTitle}>ILUMINACIÓN</Text>
            <Text style={styles.sectionDescription}>
              Administra la iluminación de tu hogar fácilmente desde cualquier lugar y en cualquier momento.
            </Text>
            <TouchableOpacity style={styles.iconButton} onPress={() => rutaDevice.push("lucescasas")}>
              <FontAwesome5 name="arrow-right" size={20} color="#111827" />
            </TouchableOpacity>
          </Card.Content>
        </Card>

        {/* PUERTAS */}
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.puertaImageWrapper}>
              <Image
                source={{
                  uri: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR6m7c20c-ShdS2V8ZTvL3dDOsrdoiemlVj423EsR2u_Ixv_J0ImR6xY9BX7Ijv-oXm9yPJ3Su-5SUYmm44XQ_ewhxZHPTVFfU9pmHR8fus0uIbXKetSx2Wlik",
                }}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.sectionLabel}>CONTROL</Text>
            <Text style={styles.sectionTitle}>PUERTA</Text>
            <Text style={styles.sectionDescription}>
              Administra el acceso y la seguridad de tu hogar fácilmente desde cualquier lugar y en cualquier momento.
            </Text>
            <TouchableOpacity style={styles.iconButton} onPress={() => rutaDevice.push("puertacasa")}>
              <FontAwesome5 name="arrow-right" size={20} color="#111827" />
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    marginBottom: 20,
  },
  headerDecoration: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "#E0E7FF",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    opacity: 0.2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  cardContent: {
    alignItems: "flex-start",
    padding: 16,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 12,
    marginBottom: 16,
    alignSelf: "center",
  },
  puertaImageWrapper: {
    width: "100%",
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    padding: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  sectionLabel: {
    fontSize: 14,
    color: "#6366F1",
    fontWeight: "500",
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 16,
  },
  iconButton: {
    backgroundColor: "#E5E7EB",
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
});
