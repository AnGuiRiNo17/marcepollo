import React, { useState, useContext } from "react";
import { Alert, View } from "react-native";
import { TextInput, Button, Text, } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
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
      password: password
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
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
    <View style={{ padding: 10, flex: 1, justifyContent: "center" }}>
      <Text style={{ textAlign: 'center' }} variant="displayLarge">Login</Text>

      <TextInput
        style={{ marginTop: 10 }}
        label="Email"
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
        left={<TextInput.Icon icon="account" />}
      />
      <TextInput
        style={{ marginTop: 10 }}
        label="Password"
        value={password}
        secureTextEntry={verpw}
        right={<TextInput.Icon icon="eye" onPress={() => setVerpw(!verpw)} />}
        left={<TextInput.Icon icon="key" />}
        onChangeText={setPassword}
      />

      <Button
        style={{ marginTop: 10, padding: 10 }}
        icon="login"
        mode="contained"
        onPress={handlogin}
      >
        Iniciar Sesión
      </Button>

      <Button
        style={{ marginTop: 10, padding: 10 }}
        icon="account-plus"
        mode="outlined"
        onPress={()=>rutasLogin.push('crearcuenta')}
      >
        Crear cuenta
      </Button>
    </View>
  );
}
