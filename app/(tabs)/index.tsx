import { Image, StyleSheet, Platform, Button, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Timer } from '@/components/Timer';

import {Audio} from "expo-av";


//constantes(en array) para colores de la app
const colors =["#fa3005", "#9baef5", "#feda25" ]

export default function HomeScreen() {
  //estado para ver si se esta corriendo el tiempo o no
  const [isWorking, setIsWorking] = useState(false);
  //Estado del pomodoro
  const [time, setTime] = useState(25 * 60);
  //Estado del tab
  const [currentTime, setCurrentTime] = useState(0 | 1 | 2);

  //funcion, estado para iniciar o detener el tiempo
  const [isActive, setIsActve] = useState(false);
  function handlerStartStop(){
    playSound();
    setIsActve(!isActive);
  }

  //funcion para reproducir audio
  async function playSound(){
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/audio/reloj.mp3")
    )
    await sound.playAsync();
  }

  //UseEffect para manejar el temporizador
  useEffect(()=>{
    let interval = null;
    if (isActive){
      //correr tiempo 
      interval = setInterval(()=>{
        setTime(time -1);
      }, 1000);
    }else{
      //limpiar intervalo
      clearInterval(interval);
    }

    //si los segundos llegan a 0, se reinicia
    if(time === 0){
      setIsActve(false);
      setIsWorking(prev =>!prev);
      setTime(isWorking ? 300: 1500)
    }
    return ()=> clearInterval(interval)
  },[isActive, time]);

  return (
    <SafeAreaProvider 
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View style={{
        flex:1, 
        paddingHorizontal: 15,
        paddingTop: Platform.OS === "android" ? 30 : 0 
        }}>
      <Text style={styles.text}>Pomodoro</Text>
      <Header 
        currentTime ={ currentTime}
        setCurrentTime ={ setCurrentTime }
        setTime= { setTime }
      />

      <Timer time={time} />

      <TouchableOpacity onPress={handlerStartStop} style={styles.button}>
        <Text style={{
          color:"white", 
          fontWeight: "bold"}}
        >{isActive ? "STOP": "START"}
        </Text>
      </TouchableOpacity>

    </View>
    </SafeAreaProvider>
  );
}

//Estilos de la app
const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
  button:{
    backgroundColor: "#333333",
    padding: 15,
    marginTop:15,
    alignItems:"center",
    borderRadius:5,
  }
});
