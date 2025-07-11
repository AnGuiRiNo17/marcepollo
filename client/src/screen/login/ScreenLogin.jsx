import React, { useState, useContext } from "react";
import { Alert, View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { estadoLoginGlobal } from "../../context/contexData";

export default function ScreenLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verpw, setVerpw] = useState(true);
  const rutasLogin = useNavigation();

  const api = process.env.EXPO_PUBLIC_API_URL;
  const { login } = useContext(estadoLoginGlobal);

  const handlogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Atención", "Rellena todos los campos");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      user: email,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${api}/api/usuario/login`, requestOptions);
      const result = await response.json();

      if (result.body.status === true) {
        Alert.alert("Bienvenido", result.body.user.nombre);
        login();
      } else {
        Alert.alert("Mensaje", result.body.mensaje);
      }

      console.log(result);
    } catch (error) {
      console.error("Error en login:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="displaySmall">
        Login
      </Text>

      <TextInput
        style={styles.input}
        label="Email"
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
        left={<TextInput.Icon icon="account" />}
      />

      <TextInput
        style={styles.input}
        label="Password"
        value={password}
        secureTextEntry={verpw}
        left={<TextInput.Icon icon="key" />}
        right={<TextInput.Icon icon="eye" onPress={() => setVerpw(!verpw)} />}
        onChangeText={setPassword}
      />

      <Button
        icon="login"
        mode="contained"
        style={styles.mainButton}
        contentStyle={{ paddingVertical: 6 }}
        onPress={handlogin}
      >
        Iniciar Sesión
      </Button>

      <Button
        icon="account-plus"
        mode="outlined"
        style={styles.outlinedButton}
        onPress={() => rutasLogin.push("crearcuenta")}
      >
        Crear cuenta
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
  outlinedButton: {
    marginTop: 12,
    borderRadius: 8,
    borderColor: "#D1D5DB",
  },
});
