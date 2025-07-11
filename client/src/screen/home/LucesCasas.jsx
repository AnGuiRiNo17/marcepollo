import React, { useEffect, useState, useContext } from "react";
import { ScrollView, StyleSheet, View, SafeAreaView } from "react-native";
import { Text, ActivityIndicator, Button } from "react-native-paper";

import { estadoDevicesGlobal } from "../../context/contexData";
import LuzCard from "../../components/LuzCard";
import BotonAddLight from "../../components/BotonAddLight";

export default function LucesCasas() {
  const api = process.env.EXPO_PUBLIC_API_URL;

  const [luces, setLuces] = useState([]);
  const [cargando, setCargando] = useState(true);

  const { ObtenerTodasLuces } = useContext(estadoDevicesGlobal);

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

  useEffect(() => {
    obtenerLuces();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Panel de Luces</Text>
        <BotonAddLight recargarLuces={obtenerLuces} style={styles.addButton} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={luces.length === 0 ? styles.emptyScroll : undefined}
        showsVerticalScrollIndicator={false}
      >
        {cargando ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator animating={true} color="#999" size="large" />
            <Text style={styles.loadingText}>Detectando dispositivos...</Text>
          </View>
        ) : luces.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyIcon}>💡</Text>
            <Text style={styles.emptyTitle}>¡Ilumina tu hogar!</Text>
            <Text style={styles.emptySubtitle}>
              Crea ambientes perfectos con luces inteligentes.{'\n'}
              Controla intensidad, color y horarios automáticamente.
            </Text>
            <Button
              mode="outlined"
              onPress={() => BotonAddLight.recargarLuces?.()}
              style={styles.emptyButton}
              textColor="#007AFF"
              contentStyle={{ paddingVertical: 6 }}
            >
              Agregar luz
            </Button>
          </View>
        ) : (
          <View style={styles.lucesGrid}>
            {luces.map((luz) => (
              <LuzCard key={luz.id} luz={luz} recargarLuces={obtenerLuces} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#1C1C1E",
    letterSpacing: -0.5,
  },
  addButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007AFF",
    backgroundColor: "#FFFFFF",
    elevation: 0,
    shadowOpacity: 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  emptyScroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: "#8E8E93",
    fontWeight: "400",
    textAlign: "center",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
    color: "#8E8E93",
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 12,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#8E8E93",
    marginBottom: 28,
    textAlign: "center",
    lineHeight: 22,
  },
  emptyButton: {
    borderColor: "#007AFF",
    borderRadius: 10,
    width: 140,
    alignSelf: "center",
  },
  lucesGrid: {
    gap: 16,
  },
});
