import React, { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

// Importar el contexto global
import { estadoLoginGlobal } from "./src/context/contexData";

import { FontAwesome } from "@expo/vector-icons";

// Crear el navegador de pestañas
const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

// Importar las pantallas principales
import ScreenAcercade from "./src/screen/acercade/ScreenAcercade";
import ScreenHome from "./src/screen/home/ScreenHome";
import ScreenSetting from "./src/screen/setting/ScreenSetting";
import ScreenUsuarios from "./src/screen/usuarios/ScreenUsuarios";

// Llamar los Screen hijos home
import LucesCasas from "./src/screen/home/LucesCasas";
import DetallesHome from "./src/screen/home/DetallesHome";
import PuertasCasa from "./src/screen/home/PuertasCasa";

// Llamar los componentes login
import ScreenLogin from "./src/screen/login/ScreenLogin";
import ScreenCrearCuenta from "./src/screen/login/ScreenCrearCuenta";

function MyStackHome() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#6C2BD9",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="menu"
        component={ScreenHome}
        options={{
          headerShown: true,
          title: "menu",
        }}
      />

      <Stack.Screen
        name="lucescasas"
        component={LucesCasas}
        options={({ navigation }) => ({
          title: "Luces Casa",
          headerLeft: () => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color="purple" />
              <Text style={{ fontSize: 16, color: "purple" }}>menu</Text>
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="puertacasa"
        component={PuertasCasa}
        options={({ navigation }) => ({
          title: "Puertas Casa",
          headerLeft: () => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color="purple" />
              <Text style={{ fontSize: 16, color: "purple" }}>menu</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="detallescasa"
        component={DetallesHome}
        options={({ navigation }) => ({
          title: "Clima",
          headerLeft: () => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color="purple" />
              <Text style={{ fontSize: 16, color: "purple" }}>menu</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="garage"
        component={DetallesHome}
        options={({ navigation }) => ({
          title: "Garage de la casa",
          headerLeft: () => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color="purple" />
              <Text style={{ fontSize: 16, color: "purple" }}>menu</Text>
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
function MyStackLogin() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={ScreenLogin} />
      <Stack.Screen name="crearcuenta" component={ScreenCrearCuenta} />
    </Stack.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Dash"
        component={Mytabs}
        options={{
          title: "Dashboard",
          drawerIcon: ({ color }) => (
            <FontAwesome name="dashboard" size={24} color={color} />
          ),
          drawerActiveTintColor: "blue",
          drawerInactiveTintColor: "gray",
          drawerStyle: { backgroundColor: "lightgray" },
        }}
      />
      <Drawer.Screen
        name="notificaciones"
        component={MyStackHome}
        options={{
          title: "Notifications",
          drawerIcon: ({ color }) => (
            <FontAwesome name="bell" size={24} color={color} />
          ),
          drawerActiveTintColor: "blue",
          drawerInactiveTintColor: "gray",
          drawerStyle: { backgroundColor: "lightgray" },
        }}
      />
      <Drawer.Screen
        name="perfin"
        component={MyStackHome}
        options={{
          title: "Perfil",
          drawerIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color="color" />
          ),
          drawerActiveTintColor: "blue",
          drawerInactiveTintColor: "gray",
          drawerStyle: { backgroundColor: "lightgray" },
        }}
      />
      <Drawer.Screen
        name="settings"
        component={MyStackHome}
        options={{
          title: "Settings",
          drawerIcon: ({ color }) => (
            <FontAwesome name="cog" size={24} color="color" />
          ),
          drawerActiveTintColor: "blue",
          drawerInactiveTintColor: "gray",
          drawerStyle: { backgroundColor: "lightgray" },
        }}
      />
    </Drawer.Navigator>
  );
}

function Mytabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        tabBarStyle: { backgroundColor: "white" },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "#888",
      }}
    >
      <Tab.Screen
        name="home"
        component={MyStackHome}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={24}
              color={focused ? "purple" : "#888"}
            />
          ),
          tabBarLabelPosition: "beside-icon",
          tabBarBadge: 67,
        }}
      />
      <Tab.Screen
        name="user"
        component={ScreenUsuarios}
        options={{
          title: "Usuarios",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={24}
              color={focused ? "purple" : "#888"}
            />
          ),
          tabBarLabelPosition: "beside-icon",
          tabBarBadge: 67,
        }}
      />
      <Tab.Screen
        name="about"
        component={ScreenAcercade}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="info-circle"
              size={24}
              color={focused ? "purple" : "#888"}
            />
          ),
          tabBarLabelPosition: "beside-icon",
          tabBarBadge: 67,
        }}
      />
      <Tab.Screen
        name="setting"
        component={ScreenSetting}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="cogs"
              size={24}
              color={focused ? "purple" : "#888"}
            />
          ),
          tabBarLabelPosition: "beside-icon",
          tabBarBadge: 67,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navegacion() {
  const { isLogin } = useContext(estadoLoginGlobal);

  console.log("Estado de login:", isLogin);

  return <>{isLogin ? <Mytabs /> : <MyStackLogin />}</>;
}
