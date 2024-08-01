import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

//Opciones de barra de estado
const options = ["Pomodoro", "Short Break", "Long Break"];

export function  Header({currentTime, setCurrentTime, setTime}){
    
    //Metodo para cambiar tiempo
    function handlePress(index){
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15
        setCurrentTime(index);
        setTime(newTime * 60);
    }

    return (
        <View style={{flexDirection: "row"}}>
            {options.map((option, index) =>(
                //tab
                 <TouchableOpacity 
                    key={index}  
                    //cambio de index al hacer click
                    onPress={()=>handlePress(index)}
                    //quitar borde en el caso de no tener la opcion seleccionada (arreglo de estilos)
                    style={[
                        styles.itemStyle,
                        currentTime !== index && {borderColor: "transparent"},
                    ]}
                 >
                    <Text>{option}</Text>
                 </TouchableOpacity>
            ))}
        </View>
    )
}

//Estilos
const styles = StyleSheet.create({
    itemStyle: {
        width: "33%",
        borderWidth:3,
        padding:5,
        marginVertical:20,
        borderRadius: 10,
        alignItems: "center",
        borderColor: "white",
    }
})

