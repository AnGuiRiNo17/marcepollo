import { useContext } from "react";
import { estadoLoginGlobal } from "../context/contexData";
import { Button } from "react-native-paper";

export default function BotonLogout() {
  const { logout } = useContext(estadoLoginGlobal);

  return <Button style={{
    padding:10, 
    marginTop:22,
  }} 
  onPress={logout} 
  mode="contained">
    Cerrar sesión
    </Button>;
}
