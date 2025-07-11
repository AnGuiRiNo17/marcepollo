import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Button, Card } from "react-native-paper";
import { Icon, MD3Colors } from "react-native-paper";
import React, { useContext } from "react";
import { useNavigation } from '@react-navigation/native';
import { estadoGlobal } from "../../context/contexData";

export default function ScreenAcercade() {
  const rutas = useNavigation();

  const { contador, sumar, restar, msg } = useContext(estadoGlobal);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Card style={styles.card}>
        <View style={styles.iconWrapper}>
          <Icon source="door" color="#8E8E93" size={70} />
        </View>
        <Button
          dark={true}
          icon="arrow-right-thin"
          mode="contained"
          buttonColor="#6B5DD2"
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          onPress={() => rutas.push('lucescasas')}
        >
          Ver opción
        </Button>
      </Card>

      <Card style={styles.card}>
        <View style={styles.iconWrapper}>
          <Icon source="door" color="#8E8E93" size={70} />
        </View>
        <Button
          icon="arrow-right-thin"
          mode="contained"
          buttonColor="#6B5DD2"
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          onPress={() => rutas.push('puertacasa')}
        >
          Ver opción
        </Button>
      </Card>

      <Card style={[styles.card, styles.counterCard]}>
        <Text style={styles.counterText}>Suma total: {contador}</Text>
        <View style={styles.counterButtons}>
          <Button
            mode="outlined"
            onPress={() => sumar()}
            style={styles.counterButton}
            textColor="#6B5DD2"
            accessibilityLabel="Sumar"
          >
            Sumar
          </Button>
          <Button
            mode="outlined"
            onPress={() => restar()}
            style={styles.counterButton}
            textColor="#6B5DD2"
            accessibilityLabel="Restar"
          >
            Restar
          </Button>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFA",
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  card: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  iconWrapper: {
    marginBottom: 20,
  },
  buttonContent: {
    height: 44,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  counterCard: {
    justifyContent: "center",
  },
  counterText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 16,
  },
  counterButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 16, // For some spacing between buttons, but 'gap' support depends on RN version
  },
  counterButton: {
    flex: 1,
    borderRadius: 10,
  },
});
