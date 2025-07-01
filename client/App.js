import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navegacion from "./Navegacion";
import StateGlobal from "./src/context/StateGlobal";
import StateLogin from "./src/context/StateLogin";
import StateDispositivos from "./src/context/StateDispositivos";
import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <StateDispositivos>
        <StateLogin>
          <StateGlobal>
            <NavigationContainer>
              <Navegacion />
              <StatusBar style="auto" />
            </NavigationContainer>
          </StateGlobal>
        </StateLogin>
      </StateDispositivos>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
