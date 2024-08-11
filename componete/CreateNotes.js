import React, { useEffect,useState } from 'react'
import { Text, StyleSheet, View,TextInput,TouchableOpacity, Alert } from 'react-native'
import DateTimePicker  from '@react-native-community/datetimepicker'
import { Platform } from 'react-native'

import appFirebase from '../credenciales'
import { getFirestore,collection,addDoc, getDocs ,doc, deleteDoc ,getDoc,setDoc } from 'firebase/firestore'
const db =getFirestore(appFirebase);


export default function CreateNotes (props) {

    const initialEstate ={
      titulo:'',
      detalle:''
    }
    
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState('false');
    const [text, setText] = useState('empty');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [estado, setEstado] = useState(initialEstate);

    const onChange = (even, selecteDate)=> {
      const currenDate =selecteDate || date ;
      setShow(Platform.OS === "ios");
      setDate(currenDate);

      let temDate =new Date(currenDate);
      let fDate =
        temDate.getDate() +
        "/" +
        (temDate.getMonth() + 1) +
        "/" +
        temDate.getFullYear();
      let fTime = 
      "Hora: " +   temDate.getHours() + " minutos: " + temDate.getMinutes();
      //setText(fDate + " " + fTime)
      setFecha(fDate);
      setHora(fTime);

    };

    const showMode = (currenDate) => {
      setShow(true);
      setMode(currenDate);
    };

    const handlerChageText= (value,name)=>{
      setEstado({...estado,[name]:value})
    }

    const saveNote = async()=>{

      try {
        if(estado.titulo === '' || estado.detalle === ''){
          Alert.alert('mensaje importante ',' debes rellenar el capo requerido' )
        }else{
          const nota = {
            titulo: estado.titulo,
            detalle: estado.detalle,
            fecha: fecha,
            hora: hora
    
          }
          await addDoc(collection(db, 'notas'),{
             ...nota
          })
          Alert.alert('exito ', ' guardado con exito' )
          props.navigation.navigate('Notas')

        }
      } catch (error) {
        console.log(error)
      }
      
      //console.log(nota);

    }



    return (
      <View style={styles.ContenedorPadre}>
        <View style={styles.tarjeta}>
          <View style={styles.contenedor}>

              <TextInput placeholder="ingresa el titulo"
               style={styles.textoInput} 
               value={estado.titulo}
               onChangeText={(value)=>handlerChageText(value, 'titulo')}
               />

              <TextInput placeholder="ingresa el detalle"
               multiline={true}
                numberOfLines={4}
                 style={styles.textoInput} 
                 value={estado.detalle}
                 onChangeText={(value)=>handlerChageText(value, 'detalle')}
                 />

      
              {/*contenedor de la fecha*/}
              <View style={styles.inputdata}>
                <TextInput placeholder="5/5/2004" style={styles.textoDate} value={fecha}/>
                <TouchableOpacity style={styles.botonDate} onPress={()=>showMode ("date")} >
                  <Text style={styles.subtitle}>Fecha</Text>
                </TouchableOpacity>
              </View>

               {/*contenedor de la hora*/}

               <View style={styles.inputdata}>
                <TextInput placeholder="hora: 6  minutos: 30" style={styles.textoDate} value= {hora}/>
                <TouchableOpacity style={styles.botonDate}onPress={()=>showMode ("time")} >
                  <Text style={styles.subtitle}>Hora</Text>
                </TouchableOpacity>
              </View>

              {show && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value= {date}
                    mode= {mode}
                    is24Hour= {true}
                    display= 'default'
                    onChange= {onChange}
                    minimumDate= {new Date ("2024-1-1")}
                />
             
           
              )}

              {/*boton para enviar los datos*/}
              <View>
                <TouchableOpacity style={styles.botonenviar} onPress={saveNote}  >
                  <Text style={styles.TextBtnEnviar}>
                    Guardar una nueva nota
                  </Text>
                </TouchableOpacity>
              </View>

          </View>
        </View>
      </View>
    )
  
}

const styles = StyleSheet.create({
  ContenedorPadre:{
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  tarjeta:{
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius:4,
    elevation:5,

  },
  contenedor:{
    padding: 20,
  },
  textoInput:{
    borderColor: 'slategray',
    borderWidth: 1,
    padding: 2,
    marginTop: 10,
    borderRadius: 8,
  },
  inputdata:{
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  botonDate:{
    backgroundColor: '#B71375',
    borderRadius:5,
    padding: 10,
    width: '30%',
    height: '90%',
    marginTop: 10,
    marginLeft: 10,
  },
  textoDate:{
    borderColor: 'slategray',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  subtitle:{
    color: 'white',
    fontSize: 18,
  },
  botonenviar:{
    backgroundColor: '#B71375',
    borderColor: "#FC4F00",
    borderWidth: 3,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  TextBtnEnviar:{
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16,
  },

})