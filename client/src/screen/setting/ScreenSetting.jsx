import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BotonLogout from '../../components/ButtonLogout'

export default function ScreenSetting() {
  return (
    <View>
      <Text>Configuración de la aplicación</Text>
      <BotonLogout />
    </View>
  )
}

const styles = StyleSheet.create({})