import React, { useState, useContext } from "react";
import { Alert, View } from "react-native";
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
    <View style={{ padding: 10, flex: 1, justifyContent: "center" }}>
      <Text style={{ textAlign: "center" }} variant="displayLarge">
        Crear Cuenta
      </Text>

      <TextInput
        style={{ marginTop: 10 }}
        label="Nombre"
        value={nombre}
        onChangeText={setNombre}
        left={<TextInput.Icon icon="account" />}
      />

      <TextInput
        style={{ marginTop: 10 }}
        label="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        left={<TextInput.Icon icon="email" />}
      />

      <TextInput
        style={{ marginTop: 10 }}
        label="Password"
        secureTextEntry={verpw}
        value={password}
        onChangeText={setPassword}
        left={<TextInput.Icon icon="lock" />}
        right={<TextInput.Icon icon="eye" onPress={() => setVerpw(!verpw)} />}
      />

      <Button mode="contained" icon="account-plus" style={{ marginTop: 20, padding: 10 }} onPress={handleCrearCuenta}>
        Crear cuenta
      </Button>

      <Button mode="text" style={{ marginTop: 10 }} onPress={() => rutasSignup.push("login")}>
        ¿Ya tienes cuenta? Inicia sesión
      </Button>
    </View>
  );
}
