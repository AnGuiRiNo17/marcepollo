import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BotonLogout from '../../components/ButtonLogout'

export default function ScreenSetting() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración de la aplicación</Text>
      <View style={styles.logoutButtonContainer}>
        <BotonLogout />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  logoutButtonContainer: {
    alignItems: 'center',
  },
})
