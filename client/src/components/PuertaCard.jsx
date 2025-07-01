// PuertaCard.jsx
import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { Card, IconButton, Text, Switch } from "react-native-paper";
import { estadoDevicesGlobal } from "../context/contexData";

export default function PuertaCard({ puerta, recargarPuertas }) {
  const api = process.env.EXPO_PUBLIC_API_URL;

  const [nombre, setNombre] = useState(puerta.nombre || "");
  const [registroEntrada, setRegistroEntrada] = useState(puerta.registro_entrada || 0);

  const [modoEditarNombre, setModoEditarNombre] = useState(false);
  const [nombreTemp, setNombreTemp] = useState(nombre);

  const { cambiarEstadoPuerta, obtenerEstadoPuerta } = useContext(estadoDevicesGlobal);
  const estado = obtenerEstadoPuerta(puerta.id);

  useEffect(() => {
    console.log(`Puerta ID ${puerta.id} - nombre: ${nombre} - Estado: ${estado ? "abierta" : "cerrada"} - Entradas: ${registroEntrada}`);
  }, [estado, nombre, registroEntrada]);

  const actualizarCampo = async (campo, valor, estadoOverride = null) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const estadoParaEnviar = estadoOverride !== null ? estadoOverride : (estado ? "abierta" : "cerrada");

    const dataToSend = {
      id: puerta.id,
      nombre: campo === "nombre" ? valor : nombre,
      estado: campo === "estado" ? valor : estadoParaEnviar,
      registro_entrada: campo === "registro_entrada" ? valor : registroEntrada,
    };

    console.log(`ENVIANDO A API - Campo: ${campo}, Valor: ${valor}, Datos completos:`, dataToSend);

    const raw = JSON.stringify(dataToSend);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${api}/api/puertas/actualizar`, requestOptions);
      const resultado = await response.json();
      console.log(`RESPUESTA API - Campo ${campo} actualizado:`, resultado);
      
      // Solo recargar puertas si es actualización de nombre
      // NO recargar para estado ni registro_entrada
      if (campo === "nombre") {
        recargarPuertas();
      }
    } catch (error) {
      console.error(` ERROR API - al actualizar ${campo}:`, error);
      throw error; // Propagar el error para manejarlo en actualizarEstado
    }
  };
  
  const eliminarPuerta = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ id: puerta.id });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${api}/api/puertas/eliminar`, requestOptions);
      const resultado = await response.json();
      console.log(`Puerta eliminada: ${nombre}`, resultado);
      recargarPuertas();
    } catch (error) {
      console.error("Error al eliminar puerta:", error);
    }
  };

  const guardarNombre = () => {
    if (nombreTemp !== nombre) {
      setNombre(nombreTemp);
      actualizarCampo("nombre", nombreTemp);
    }
    setModoEditarNombre(false);
  };

  const verificarEstadoEnBD = async () => {
    try {
      const response = await fetch(`${api}/api/puertas`, {
        method: "GET",
        redirect: "follow",
      });
      const data = await response.json();
      const puertaActual = data.body.find(p => p.id === puerta.id);
      console.log(`VERIFICACIÓN BD - Puerta ${puerta.id}: Estado en BD = "${puertaActual?.estado}", Estado en contexto = "${estado ? 'abierta' : 'cerrada'}"`);
    } catch (error) {
      console.error("Error al verificar estado en BD:", error);
    }
  };

  const actualizarEstado = async () => {
    const estadoActual = obtenerEstadoPuerta(puerta.id);
    const nuevoEstadoBooleano = !estadoActual;
    const nuevoEstadoString = nuevoEstadoBooleano ? "abierta" : "cerrada";
    
    console.log(`ANTES - Estado actual: ${estadoActual ? 'abierta' : 'cerrada'}, Nuevo estado: ${nuevoEstadoString}`);
    
    try {
      // Primero cambiar en contexto global
      cambiarEstadoPuerta(puerta.id);

      // Actualizar en base de datos
      await actualizarCampo("estado", nuevoEstadoString);
      
      // Verificar que se guardó correctamente
      setTimeout(() => verificarEstadoEnBD(), 1000);

      // Si se abrió, aumentar contador
      if (nuevoEstadoBooleano) {
        const nuevoRegistro = registroEntrada + 1;
        setRegistroEntrada(nuevoRegistro);
        // Pasar el estado correcto como override para que no se sobrescriba
        await actualizarCampo("registro_entrada", nuevoRegistro, nuevoEstadoString);
      }
    } catch (error) {
      // Si hay error, revertir el cambio en el contexto
      console.error("Error al actualizar estado:", error);
      cambiarEstadoPuerta(puerta.id); // Revertir
    }
  };

  return (
    <Card style={[styles.card, { backgroundColor: "#fff", alignItems: "center", justifyContent: "center", borderWidth: 0, elevation: 0, paddingVertical: 24 }]}>
      <Card.Content style={{ alignItems: "center", justifyContent: "center", width: "100%" }}>
        {/* Nombre y eliminar */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
          {modoEditarNombre ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                value={nombreTemp}
                onChangeText={setNombreTemp}
                style={{ backgroundColor: "#F3F4F6", color: "#222", borderBottomWidth: 1, borderBottomColor: "#4ADE80", fontSize: 18, minWidth: 80 }}
                placeholder="Nombre"
                placeholderTextColor="#A1A1AA"
                autoFocus
              />
              <IconButton icon="check" iconColor="#4ADE80" size={20} onPress={guardarNombre} />
              <IconButton icon="close" iconColor="#EF4444" size={20} onPress={() => setModoEditarNombre(false)} />
            </View>
          ) : (
            <>
              <TouchableOpacity onPress={() => setModoEditarNombre(true)}>
                <Text style={{ fontSize: 18, fontWeight: "700", color: "#222", marginRight: 8 }}>
                  {nombre || "🚪 Sin nombre"}
                </Text>
              </TouchableOpacity>
              <IconButton icon="delete" iconColor="#EF4444" size={20} onPress={eliminarPuerta} />
            </>
          )}
        </View>
        {/* Switch para abrir/cerrar */}
        <View style={{ alignItems: "center", marginBottom: 12 }}>
          <Switch
            value={estado}
            onValueChange={actualizarEstado}
            trackColor={{ false: "#A1A1AA", true: "#4ADE80" }}
            thumbColor={estado ? "#4ADE80" : "#A1A1AA"}
          />
          <Text style={{ fontSize: 14, color: "#444", marginTop: 2 }}>
            {estado ? "Abierta" : "Cerrada"}
          </Text>
        </View>
        {/* Círculo principal con candado */}
        <View style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          borderWidth: 8,
          borderColor: estado ? "#4ADE80" : "#A1A1AA",
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 8,
        }}>
          <Text style={{ fontSize: 36, color: "#444" }}>
            {estado ? "🔓" : "🔒"}
          </Text>
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
    borderColor: "#E9D5FF",
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
    backgroundColor: "#F3F4F6",
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
  registroSection: {
    backgroundColor: "#F5F3FF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E9D5FF",
  },
  registroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  registroLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    flex: 1,
  },
  registroValueContainer: {
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 40,
    alignItems: "center",
    shadowColor: "#8B5CF6",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  registroValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  registroValueActive: {
    color: "#FFFFFF",
  },
  registroInfo: {
    marginTop: 8,
  },
  registroDescription: {
    fontSize: 12,
    color: "#6B7280",
    fontStyle: "italic",
    textAlign: "center",
  },
});