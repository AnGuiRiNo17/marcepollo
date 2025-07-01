import { StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";
import { Icon, MD3Colors } from "react-native-paper";
import React, {useContext} from "react";
import { useNavigation } from '@react-navigation/native';
import { estadoGlobal } from "../../context/contexData";

export default function ScreenAcercade() {
  const rutas = useNavigation();
  
  // Importar el contexto global
   const { contador, sumar, restar, msg } = useContext(estadoGlobal);
   console.log(contador);
  return (
    <View style={{ padding: 10 }}>
      <Card style={{ padding: 5, marginTop: 10 }}>
        <Icon source="door" color={MD3Colors.error50} size={70} />

        <Button
        dark={true}
          icon="arrow-right-thin"
          mode="contained"
          buttonColor="purple"
          // onPress={()=>rutas.replace('lucescasas')}
          onPress={()=>rutas.push('lucescasas')}
        >
          ver opcion
        </Button>
      </Card>
      <Card style={{ padding: 5, marginTop: 10 }}>
        <Icon source="door" color={MD3Colors.error50} size={70} />

        <Button
          icon="arrow-right-thin"
          mode="contained"
          buttonColor="purple"
          onPress={()=>rutas.push('puertacasa')}
        >
          ver opcion
        </Button>
      </Card>
      <Card style={{ padding: 20, marginTop: 20 }}>
        <Text> Suma total: {contador}</Text>
        <Button onPress={()=>sumar()}>Sumar</Button>
        <Button onPress={()=>restar()}>Restar</Button>
      </Card>

    </View>
  )
}

const styles = StyleSheet.create({})