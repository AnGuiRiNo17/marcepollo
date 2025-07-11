import React, { useState, useContext } from "react";
import { Alert, View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { estadoLoginGlobal } from "../../context/contexData";

export default function ScreenCrearCuenta() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verpw, setVerpw] = useState(true);
  const rutasSignup = useNavigation();

  const api = process.env.EXPO_PUBLIC_API_URL;
  const { login } = useContext(estadoLoginGlobal);

  const handleCrearCuenta = async () => {
    if (nombre.trim() === "" || email.trim() === "" || password.trim() === "") {
      Alert.alert("Atención", "Todos los campos son obligatorios");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id: 0,
      nombre: nombre,
      pw: password,
      email: email,
      status: 1,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${api}/api/usuario/agregar`, requestOptions);
      const result = await response.json();

      if (result.body?.status === true) {
        Alert.alert("Éxito", result.body.mensaje || "Cuenta creada exitosamente.");
        login();
      } else {
        Alert.alert("Mensaje", result.body?.mensaje || "Ocurrió un error.");
      }

      console.log("Resultado:", result);
    } catch (error) {
      console.error("Error en crear cuenta:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="displaySmall">
        Crear Cuenta
      </Text>

      <TextInput
        style={styles.input}
        label="Nombre"
        value={nombre}
        onChangeText={setNombre}
        left={<TextInput.Icon icon="account" />}
      />

      <TextInput
        style={styles.input}
        label="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        left={<TextInput.Icon icon="email" />}
      />

      <TextInput
        style={styles.input}
        label="Password"
        secureTextEntry={verpw}
        value={password}
        onChangeText={setPassword}
        left={<TextInput.Icon icon="lock" />}
        right={<TextInput.Icon icon="eye" onPress={() => setVerpw(!verpw)} />}
      />

      <Button
        mode="contained"
        icon="account-plus"
        style={styles.mainButton}
        contentStyle={{ paddingVertical: 6 }}
        onPress={handleCrearCuenta}
      >
        Crear cuenta
      </Button>

      <Button
        mode="text"
        style={styles.textButton}
        onPress={() => rutasSignup.push("login")}
      >
        ¿Ya tienes cuenta? Inicia sesión
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    fontSize: 28,
    fontWeight: "600",
    color: "#111827",
  },
  input: {
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    borderRadius: 8,
  },
  mainButton: {
    backgroundColor: "#111827",
    marginTop: 8,
    borderRadius: 8,
  },
  textButton: {
    marginTop: 12,
  },
});
