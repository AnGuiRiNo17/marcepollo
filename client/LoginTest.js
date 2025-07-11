import React from 'react';
import { View, Text, Button, Alert } from 'react-native';

const API = process.env.EXPO_PUBLIC_API_URL;

export default function LoginTest() {
  const handleLogin = async () => {
    try {
      const response = await fetch(`${API}/usuario/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: 'admin',  // Cambia por un correo válido de tu DB
          password: '1234',           // Y la contraseña correspondiente
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('✅ Login exitoso', JSON.stringify(data));
      } else {
        Alert.alert('❌ Error', data?.mensaje || 'Credenciales inválidas');
      }
    } catch (error) {
      Alert.alert('💥 Error de red', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Prueba de Login</Text>
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
}
