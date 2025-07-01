import React, { useEffect, useState, useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";

import { estadoDevicesGlobal } from "../../context/contexData";
import LuzCard from "../../components/LuzCard";
import BotonAddLight from "../../components/BotonAddLight";

export default function LucesCasas() {
  const api = process.env.EXPO_PUBLIC_API_URL;

  // ----------------------------- Estados locales -----------------------------
  const [luces, setLuces] = useState([]);
  const [cargando, setCargando] = useState(true);

  // ----------------------------- Contexto global -----------------------------
  const { ObtenerTodasLuces } = useContext(estadoDevicesGlobal);

  // ----------------------------- Función para obtener luces -----------------------------
  const obtenerLuces = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(`${api}/api/luces`, requestOptions);
      const data = await response.json();

      if (Array.isArray(data.body)) {
        setLuces(data.body);
        ObtenerTodasLuces(true);
      } else {
        console.error("La propiedad 'body' no es un arreglo:", data.body);
      }
    } catch (error) {
      console.error("Error al obtener luces:", error);
    } finally {
      setCargando(false);
    }
  };

  // ----------------------------- useEffect inicial -----------------------------
  useEffect(() => {
    obtenerLuces();
  }, []);

  // ----------------------------- Renderizado -----------------------------
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.actionSection}>
        <View style={styles.actionHeader}></View>
        <BotonAddLight recargarLuces={obtenerLuces} />
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>Panel de Luces</Text>

        {cargando ? (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingContent}>
              <ActivityIndicator
                animating={true}
                color="#8B5CF6"
                size="large"
              />
              <Text style={styles.loadingText}>Detectando dispositivos...</Text>
              <View style={styles.loadingDots}>
                <View style={[styles.dot, styles.dot1]} />
                <View style={[styles.dot, styles.dot2]} />
                <View style={[styles.dot, styles.dot3]} />
              </View>
            </View>
          </View>
        ) : luces.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyStateContent}>
              <View style={styles.emptyIconContainer}>
                <Text style={styles.emptyStateIcon}>🌟</Text>
              </View>
              <Text style={styles.emptyStateTitle}>¡Ilumina tu hogar!</Text>
              <Text style={styles.emptyStateSubtitle}>
                Crea ambientes perfectos con luces inteligentes.{"\n"}
                Controla la intensidad, color y horarios automáticamente.
              </Text>
              <View style={styles.emptyFeatures}>
                <View style={styles.featureItem}>
                  <Text style={styles.featureIcon}>🎨</Text>
                  <Text style={styles.featureText}>Colores RGB</Text>
                </View>
                <View style={styles.featureItem}>
                  <Text style={styles.featureIcon}>⏰</Text>
                  <Text style={styles.featureText}>Programación</Text>
                </View>
                <View style={styles.featureItem}>
                  <Text style={styles.featureIcon}>📊</Text>
                  <Text style={styles.featureText}>Ahorro energía</Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.lucesGrid}>
            {luces.map((luz) => (
              <LuzCard key={luz.id} luz={luz} recargarLuces={obtenerLuces} />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F4FF",
  },
  header: {
    marginBottom: 24,
  },
  headerGradient: {
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: "#8B5CF6",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 6,
    letterSpacing: -0.8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#E9D5FF",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backdropFilter: "blur(10px)",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: "#E9D5FF",
    fontWeight: "500",
    opacity: 0.8,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 20,
  },
  actionSection: {
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#8B5CF6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#E9D5FF",
  },
  actionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#581C87",
    marginBottom: 8,
    marginLeft: 4,
  },
  contentSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  loadingContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginTop: 12,
    shadowColor: "#8B5CF6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#E9D5FF",
  },
  loadingContent: {
    paddingVertical: 60,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#7C3AED",
    marginTop: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  loadingDots: {
    flexDirection: "row",
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#C4B5FD",
    marginHorizontal: 4,
  },
  dot1: {
    opacity: 1,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 0.4,
  },
  emptyStateContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginTop: 12,
    shadowColor: "#8B5CF6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#E9D5FF",
  },
  emptyStateContent: {
    paddingVertical: 48,
    paddingHorizontal: 28,
    alignItems: "center",
  },
  emptyIconContainer: {
    backgroundColor: "#E9D5FF",
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#8B5CF6",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyStateIcon: {
    fontSize: 40,
  },
  emptyStateTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#581C87",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: "#6B46C1",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
    opacity: 0.8,
  },
  emptyFeatures: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  featureItem: {
    alignItems: "center",
    flex: 1,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: "#8B5CF6",
    fontWeight: "600",
    textAlign: "center",
  },
  lucesGrid: {
    marginTop: 12,
  },
});
