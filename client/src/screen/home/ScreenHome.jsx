import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Card, Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function ScreenHome() {
  const rutaDevice = useNavigation();

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Bienvenido a tu Hogar Inteligente
      </Text>
      {/* Header decorativo */}
      <View style={styles.headerDecoration} />

      {/* Fila 1: Luces y Puertas */}
      <View style={styles.row}>
        <Card style={styles.card}>
          <Card.Content style={[styles.cardContent, { alignItems: "flex-start", paddingTop: 10 }]}>
            <Image
              source={{ uri: "https://luanda.es/wp-content/uploads/2024/05/34228-01.jpg" }}
              style={{ width: 120, height: 120, alignSelf: 'center', marginBottom: 10, borderRadius: 10 }}
              resizeMode="contain"
            />
            <Text style={{ color: "#A78BFA", fontSize: 16, marginBottom: 2, marginLeft: 4, fontWeight: "600" }}>
              CONTROL
            </Text>
            <Text style={{ fontSize: 32, fontWeight: "bold", color: "#22223B", marginBottom: 8, marginLeft: 4 }}>
              ILUMINACIÓN
            </Text>
            <Text style={{ color: "#6B46C1", fontSize: 13, marginBottom: 20, marginLeft: 4 }}>
              Administra la iluminación de tu hogar fácilmente desde cualquier lugar y en cualquier momento
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#C7F2E6",
                borderRadius: 16,
                width: 48,
                height: 48,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "flex-end"
              }}
              onPress={() => rutaDevice.push("lucescasas")}
            >
              <FontAwesome5 name="arrow-right" size={24} color="#22223B" />
            </TouchableOpacity>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content style={[styles.cardContent, { alignItems: "flex-start", paddingTop: 10 }]}>
            <View style={{
              width: 140,
              height: 140,
              backgroundColor: "#F6F6F6",
              borderRadius: 24,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              marginBottom: 10
            }}>
              <Image
                source={{ uri: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR6m7c20c-ShdS2V8ZTvL3dDOsrdoiemlVj423EsR2u_Ixv_J0ImR6xY9BX7Ijv-oXm9yPJ3Su-5SUYmm44XQ_ewhxZHPTVFfU9pmHR8fus0uIbXKetSx2Wlik" }}
                style={{ width: 90, height: 110, resizeMode: "contain" }}
              />
            </View>
            <Text style={{ color: "#8B5CF6", fontSize: 16, marginBottom: 2, marginLeft: 4, fontWeight: "600" }}>
              CONTROL
            </Text>
            <Text style={{ fontSize: 32, fontWeight: "bold", color: "#22223B", marginBottom: 8, marginLeft: 4 }}>
              PUERTA
            </Text>
            <Text style={{ color: "#6B46C1", fontSize: 13, marginBottom: 20, marginLeft: 4 }}>
              Administra el acceso y la seguridad de tu hogar fácilmente desde cualquier lugar y en cualquier momento
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#C7F2E6",
                borderRadius: 16,
                width: 48,
                height: 48,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "flex-end"
              }}
              onPress={() => rutaDevice.push("puertacasa")}
            >
              <FontAwesome5 name="arrow-right" size={24} color="#22223B" />
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
    padding: 16,
    backgroundColor: "#F3F0FF",
    justifyContent: "center",
  },
  headerDecoration: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    opacity: 0.1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  card: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 24,
    elevation: 8,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    position: "relative",
    shadowColor: "#7C3AED",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  cardGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 6,
  },
  glowLuces: {
    backgroundColor: "#A855F7",
    shadowColor: "#A855F7",
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  glowPuertas: {
    backgroundColor: "#9333EA",
    shadowColor: "#9333EA",
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  glowClima: {
    backgroundColor: "#8B5CF6",
    shadowColor: "#8B5CF6",
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  glowGaraje: {
    backgroundColor: "#7C3AED",
    shadowColor: "#7C3AED",
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  cardLuces: {
    borderWidth: 1,
    borderColor: "#E9D5FF",
  },
  cardPuertas: {
    borderWidth: 1,
    borderColor: "#DDD6FE",
  },
  cardClima: {
    borderWidth: 1,
    borderColor: "#C4B5FD",
  },
  cardGaraje: {
    borderWidth: 1,
    borderColor: "#A78BFA",
  },
  cardContent: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  iconContainer: {
    position: "relative",
    marginBottom: 16,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#FAF7FF",
    elevation: 3,
  },
  iconShadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    opacity: 0.3,
  },
  shadowLuces: {
    backgroundColor: "#E9D5FF",
  },
  shadowPuertas: {
    backgroundColor: "#DDD6FE",
  },
  shadowClima: {
    backgroundColor: "#C4B5FD",
  },
  shadowGaraje: {
    backgroundColor: "#A78BFA",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#581C87",
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  titleLuces: {
    color: "#7C3AED",
  },
  titlePuertas: {
    color: "#8B5CF6",
  },
  titleClima: {
    color: "#9333EA",
  },
  titleGaraje: {
    color: "#A855F7",
  },
  cardDescription: {
    fontSize: 13,
    color: "#6B46C1",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 18,
    fontWeight: "500",
  },
  button: {
    width: "100%",
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#7C3AED",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  buttonLuces: {
    backgroundColor: "#A855F7",
  },
  buttonPuertas: {
    backgroundColor: "#9333EA",
  },
  buttonClima: {
    backgroundColor: "#8B5CF6",
  },
  buttonGaraje: {
    backgroundColor: "#7C3AED",
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.3,
    paddingVertical: 4,
  },
});
