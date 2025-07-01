import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { estadoGlobal } from './contexData';

export default function StateGlobal({children}) {

    const [contador, setContador] = useState(5);
    
    const sumar = () => {
        setContador(contador+1);
    }
    const restar = () => {
        setContador(contador-1);
    }

    const msg = "nos vemos pronto";
    
  return (
    <estadoGlobal.Provider value={{contador, sumar, restar, msg}}>
        {children}
    </estadoGlobal.Provider>
  )
}