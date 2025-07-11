import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function DetallesHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Hogar</Text>
      <Text style={styles.subtitle}>
        Aquí podrás ver información detallada sobre tus dispositivos conectados,
        estado actual y más detalles relevantes de tu hogar inteligente.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
  },
});
