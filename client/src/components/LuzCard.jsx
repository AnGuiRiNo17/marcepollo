// LuzCard.jsx
import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, TextInput, PanResponder, Animated, TouchableOpacity } from "react-native";
import { Card, IconButton, Text, Switch, ProgressBar } from "react-native-paper";
import { estadoDevicesGlobal } from "../context/contexData";

export default function LuzCard({ luz, recargarLuces }) {
  const api = process.env.EXPO_PUBLIC_API_URL;

  // ----------------------------- Estados locales -----------------------------
  const [nombre, setNombre] = useState(luz.nombre || "");
  const [intensidad, setIntensidad] = useState(luz.intensidad || 0);

  const [modoEditarNombre, setModoEditarNombre] = useState(false);
  const [nombreTemp, setNombreTemp] = useState(nombre);
  const [lastTap, setLastTap] = useState(0);

  // ----------------------------- Contexto global -----------------------------
  const { cambiarEstadoLuz, obtenerEstadoLuz } = useContext(estadoDevicesGlobal);
  const estado = obtenerEstadoLuz(luz.id); // Obtener estado individual de la luz

  // ----------------------------- useEffect de monitoreo -----------------------------
  useEffect(() => {
    console.log(`Luz ID ${luz.id} - nombre: ${nombre} - Estado: ${estado ? "Encendida" : "Apagada"} - Intensidad: ${intensidad}%`);
  }, [estado, nombre, intensidad]);

  // Slider vertical para intensidad
  const sliderHeight = 160;
  const pan = React.useRef(new Animated.ValueXY({ x: 0, y: sliderHeight * (1 - intensidad / 100) })).current;

  useEffect(() => {
    // Sincroniza el thumb con la intensidad cuando cambia desde fuera
    pan.setValue({ x: 0, y: sliderHeight * (1 - intensidad / 100) });
  }, [intensidad]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => estado, // Solo si la luz está encendida
    onPanResponderMove: (_, gestureState) => {
      if (!estado) return;
      let newY = Math.max(0, Math.min(sliderHeight, gestureState.dy + pan.y._value));
      let newIntensidad = Math.round(100 - (newY / sliderHeight) * 100);
      setIntensidad(newIntensidad);
      pan.setValue({ x: 0, y: newY });
    },
    onPanResponderRelease: (_, gestureState) => {
      if (!estado) return;
      let newY = Math.max(0, Math.min(sliderHeight, gestureState.dy + pan.y._value));
      let newIntensidad = Math.round(100 - (newY / sliderHeight) * 100);
      actualizarIntensidad(newIntensidad);
    },
  });

  // ----------------------------- Funciones de API -----------------------------
  const actualizarCampo = async (campo, valor) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id: luz.id,
      nombre: campo === "nombre" ? valor : nombre,
      estado: campo === "estado" ? valor : estado ? "encendida" : "apagada",
      intensidad: campo === "intensidad" ? valor : intensidad,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${api}/api/luces/actualizar`, requestOptions);
      const resultado = await response.json();
      console.log(`Campo ${campo} actualizado:`, resultado);
      recargarLuces();
    } catch (error) {
      console.error(`Error al actualizar ${campo}:`, error);
    }
  };

  const eliminarLuz = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ id: luz.id });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${api}/api/luces/eliminar`, requestOptions);
      const resultado = await response.json();
      console.log(`Luz eliminada: ${nombre}`, resultado);
      recargarLuces();
    } catch (error) {
      console.error("Error al eliminar luz:", error);
    }
  };

  // ----------------------------- Funciones auxiliares -----------------------------
  const guardarNombre = () => {
    if (nombreTemp !== nombre) {
      setNombre(nombreTemp);
      actualizarCampo("nombre", nombreTemp);
    }
    setModoEditarNombre(false);
  };

  const actualizarEstado = () => {
    cambiarEstadoLuz(luz.id);
    actualizarCampo("estado", !estado ? "encendida" : "apagada");
  };

  const actualizarIntensidad = (valor) => {
    const nueva = Math.max(0, Math.min(100, valor));
    setIntensidad(nueva);
    actualizarCampo("intensidad", nueva);
  };

  // ----------------------------- Render UI -----------------------------
  return (
    <Card style={[styles.card, { backgroundColor: '#fff', borderRadius: 24, alignItems: 'center', paddingVertical: 24 }]}> 
      <Card.Content style={{ alignItems: "center", backgroundColor: "transparent", width: '100%' }}>
        {/* Header con estado visual */}
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={[styles.statusDot, estado && styles.statusDotActive]} />
            <Text style={[styles.statusText, estado && styles.statusTextActive, { color: '#fff' }]}> {estado ? "Encendida" : "Apagada"}</Text>
          </View>
          <Switch
            value={estado}
            onValueChange={actualizarEstado}
            trackColor={{ false: "#E5E7EB", true: "#C4B5FD" }}
            thumbColor={estado ? "#8B5CF6" : "#9CA3AF"}
            style={styles.switch}
          />
        </View>
        {/* Nombre y eliminar */}
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 18 }}>
          {modoEditarNombre ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <TextInput
                value={nombreTemp}
                onChangeText={setNombreTemp}
                style={[styles.nombreInput, { backgroundColor: '#23232A', color: '#fff', borderBottomColor: '#A7E9D7', fontSize: 20 }]}
                placeholder="Nombre de la luz"
                placeholderTextColor="#9CA3AF"
                autoFocus
              />
              <IconButton
                icon="check"
                iconColor="#10B981"
                size={20}
                style={styles.editButton}
                onPress={guardarNombre}
              />
              <IconButton
                icon="close"
                iconColor="#EF4444"
                size={20}
                style={styles.editButton}
                onPress={() => setModoEditarNombre(false)}
              />
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
              onPress={() => {
                const now = Date.now();
                if (now - lastTap < 300) {
                  setModoEditarNombre(true);
                }
                setLastTap(now);
              }}
            >
              <Text style={{ color: '#222', fontSize: 22, fontWeight: '700', marginRight: 8, textAlignVertical: 'center' }}>
                {nombre || "💡 Sin nombre"}
              </Text>
              <IconButton
                icon="delete"
                iconColor="#EF4444"
                size={24}
                style={{ backgroundColor: "#F3F4F6", borderRadius: 8, margin: 0, padding: 0, alignSelf: 'center' }}
                onPress={eliminarLuz}
              />
            </TouchableOpacity>
          )}
        </View>
        {/* Slider de intensidad y porcentaje */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center', width: '100%', height: 180 }}>
          {/* Botón - */}
          <IconButton
            icon="minus"
            size={28}
            style={{ backgroundColor: estado ? '#F3F4F6' : '#E5E5E5', marginRight: 8, borderRadius: 24, opacity: estado ? 1 : 0.5, borderWidth: 1, borderColor: '#E5E5E5' }}
            onPress={() => estado && actualizarIntensidad(intensidad - 5)}
            disabled={!estado}
            iconColor="#7C3AED"
          />
          {/* Barra de fondo */}
          <View style={{
            width: 36,
            height: sliderHeight,
            borderRadius: 18,
            backgroundColor: "#F3F4F6",
            justifyContent: "flex-end",
            overflow: "hidden",
            marginRight: 16,
            marginLeft: 8,
            position: 'relative',
          }}>
            {/* Progreso */}
            <View style={{
              width: "100%",
              backgroundColor: "#8B5CF6",
              borderBottomLeftRadius: 18,
              borderBottomRightRadius: 18,
              position: "absolute",
              bottom: 0,
              height: sliderHeight * (intensidad / 100),
            }} />
            {/* Thumb */}
            <Animated.View
              style={{
                position: "absolute",
                left: -6,
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: estado ? "#fff" : "#E5E5E5",
                justifyContent: "center",
                alignItems: "center",
                elevation: 4,
                shadowColor: "#000",
                shadowOpacity: 0.08,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 2 },
                transform: [{ translateY: pan.y }],
                borderWidth: 2,
                borderColor: '#8B5CF6',
                opacity: estado ? 1 : 0.5,
              }}
              {...panResponder.panHandlers}
            >
              <Text style={{ fontSize: 24, color: '#8B5CF6' }}>💡</Text>
            </Animated.View>
          </View>
          {/* Botón + */}
          <IconButton
            icon="plus"
            size={28}
            style={{ backgroundColor: estado ? '#F3F4F6' : '#E5E5E5', marginLeft: 8, borderRadius: 24, opacity: estado ? 1 : 0.5, borderWidth: 1, borderColor: '#E5E5E5' }}
            onPress={() => estado && actualizarIntensidad(intensidad + 5)}
            disabled={!estado}
            iconColor="#7C3AED"
          />
          {/* Porcentaje */}
          <View style={{
            marginLeft: 32,
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: "#F3F4F6",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            borderWidth: 2,
            borderColor: '#E5E5E5',
          }}>
            <Text style={{ fontSize: 28, fontWeight: "700", color: "#7C3AED" }}>{intensidad}%</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    elevation: 4,
    shadowColor: "#8B5CF6",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#EDE9FE",
    overflow: "hidden",
    position: "relative",
  },
  cardActive: {
    borderColor: "#8B5CF6",
    elevation: 8,
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  cardGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "#E5E7EB",
  },
  cardGlowActive: {
    backgroundColor: "#8B5CF6",
    shadowColor: "#8B5CF6",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#9CA3AF",
    marginRight: 8,
  },
  statusDotActive: {
    backgroundColor: "#8B5CF6",
    shadowColor: "#8B5CF6",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 2,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  statusTextActive: {
    color: "#7C3AED",
  },
  switch: {
    transform: [{ scale: 1.1 }],
  },
  nombreSection: {
    marginBottom: 20,
  },
  nombreEditContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nombreInput: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: "#8B5CF6",
    paddingVertical: 8,
    paddingHorizontal: 4,
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    backgroundColor: "#FAF5FF",
    borderRadius: 8,
    marginRight: 12,
  },
  accionesEditar: {
    flexDirection: "row",
  },
  editButton: {
    margin: 0,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
  },
  nombreDisplayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nombreTexto: {
    fontSize: 20,
    fontWeight: "700",
    color: "#374151",
    flex: 1,
    letterSpacing: -0.3,
  },
  nombreTextoActive: {
    color: "#7C3AED",
  },
  deleteButton: {
    margin: 0,
    backgroundColor: "#FEF2F2",
    borderRadius: 8,
  },
  intensidadSection: {
    backgroundColor: "#FDFBFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EDE9FE",
  },
  intensidadHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  intensidadLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  intensidadValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6B7280",
  },
  intensidadValueActive: {
    color: "#7C3AED",
  },
  intensidadControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  intensidadButton: {
    margin: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    elevation: 2,
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  barraProgreso: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#F3F4F6",
  },
  barraProgresoActive: {
    backgroundColor: "#EDE9FE",
    shadowColor: "#8B5CF6",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
});