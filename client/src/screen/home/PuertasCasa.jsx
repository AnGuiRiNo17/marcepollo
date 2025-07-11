// PuertasCasas.jsx
import React, { useEffect, useState, useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { estadoDevicesGlobal } from "../../context/contexData";
import PuertaCard from "../../components/PuertaCard";
import BotonAddPuerta from "../../components/BotonAddPuerta";

export default function PuertasCasas() {
  const api = process.env.EXPO_PUBLIC_API_URL;
  const [puertas, setPuertas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { ObtenerTodasPuertas, establecerEstadoPuertasDesdeLista } = useContext(estadoDevicesGlobal);

  const obtenerPuertas = async () => {
    try {
      const response = await fetch(`${api}/api/puertas`, { method: "GET", redirect: "follow" });
      const data = await response.json();
      if (Array.isArray(data.body)) {
        setPuertas(data.body);
        establecerEstadoPuertasDesdeLista(data.body);
        ObtenerTodasPuertas(true);
      } else {
        console.error("La propiedad 'body' no es un arreglo:", data.body);
      }
    } catch (error) {
      console.error("Error al obtener puertas:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerPuertas();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.actionSection}>
        <View style={styles.actionHeader} />
        <BotonAddPuerta recargarPuertas={obtenerPuertas} />
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>Panel de Puertas</Text>

        {cargando ? (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingContent}>
              <ActivityIndicator animating={true} color="#007AFF" size="large" />
              <Text style={styles.loadingText}>Sincronizando dispositivos...</Text>
              <View style={styles.loadingDots}>
                <View style={[styles.dot, styles.dot1]} />
                <View style={[styles.dot, styles.dot2]} />
                <View style={[styles.dot, styles.dot3]} />
              </View>
            </View>
          </View>
        ) : puertas.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyStateContent}>
              <View style={styles.emptyIconContainer}>
                <Text style={styles.emptyStateIcon}>🏡</Text>
              </View>
              <Text style={styles.emptyStateTitle}>¡Conecta tu primera puerta!</Text>
              <Text style={styles.emptyStateSubtitle}>
                Transforma tu hogar en un espacio inteligente.{"\n"}
                Agrega puertas y controla el acceso desde cualquier lugar.
              </Text>
              <View style={styles.emptyFeatures}>
                <View style={styles.featureItem}>
                  <Text style={styles.featureIcon}>🔒</Text>
                  <Text style={styles.featureText}>Control remoto</Text>
                </View>
                <View style={styles.featureItem}>
                  <Text style={styles.featureIcon}>📱</Text>
                  <Text style={styles.featureText}>Desde tu móvil</Text>
                </View>
                <View style={styles.featureItem}>
                  <Text style={styles.featureIcon}>🔔</Text>
                  <Text style={styles.featureText}>Notificaciones</Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.puertasGrid}>
            {puertas.map((puerta) => (
              <PuertaCard key={puerta.id} puerta={puerta} recargarPuertas={obtenerPuertas} />
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
    backgroundColor: "#F9FAFB",
  },
  actionSection: {
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: "#E5E5EA",
  },
  actionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 12,
    marginLeft: 4,
  },
  contentSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  loadingContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    padding: 32,
    alignItems: "center",
  },
  loadingContent: {
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#3A3A3C",
    marginTop: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  loadingDots: {
    flexDirection: "row",
    marginTop: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#C7C7CC",
    marginHorizontal: 4,
  },
  dot1: { opacity: 1 },
  dot2: { opacity: 0.6 },
  dot3: { opacity: 0.3 },
  emptyStateContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginTop: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyStateContent: {
    alignItems: "center",
  },
  emptyIconContainer: {
    backgroundColor: "#F2F2F7",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyStateIcon: {
    fontSize: 36,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1C1C1E",
    textAlign: "center",
    marginBottom: 10,
  },
  emptyStateSubtitle: {
    fontSize: 15,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
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
    fontSize: 20,
    marginBottom: 6,
  },
  featureText: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "500",
    textAlign: "center",
  },
  puertasGrid: {
    marginTop: 12,
  },
});
