// BotonAddLight.jsx
import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function BotonAddLight({ recargarLuces }) {
  const api = process.env.EXPO_PUBLIC_API_URL;

  // ----------------------------- Función para agregar luz -----------------------------
  const agregarLuz = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id: 0,
      nombre: "nueva luz",
      estado: "apagada",
      intensidad: 0,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${api}/api/luces/agregar`, requestOptions);
      const resultado = await response.json();

      console.log("Nueva luz agregada:", resultado);
      if (recargarLuces) recargarLuces();
    } catch (error) {
      console.error("Error al agregar nueva luz:", error);
    }
  };

  // ----------------------------- Render -----------------------------
  return (
    <Button
      icon="plus"
      mode="contained"
      onPress={agregarLuz}
      style={styles.boton}
      contentStyle={styles.content}
    >
      Agregar nueva luz
    </Button>
  );
}


const styles = StyleSheet.create({
  boton: {
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "purple",
  },
  content: {
    paddingVertical: 8,
  },
});
