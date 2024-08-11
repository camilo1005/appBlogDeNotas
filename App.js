import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Notes from './componete/Notes';
import CreateNotes from './componete/CreateNotes';
import DetailsNotes from './componete/DetailsNotes';

export default function App() {
  const Stack = createStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Notas"
          component={Notes} 
          options={{
            title: "NOTAS ",
            headerTitleAlign: "center",
            headerStyle: {backgroundColor: "#8B1874"},
            headerTintColor: "white"
          }}
        />
           <Stack.Screen 
          name="Crear"
          component={CreateNotes} 
          options={{
            title: "CREAR NOTAS",
            headerTitleAlign: "center",
            headerStyle: {backgroundColor: "#8B1874"},
            headerTintColor: "white"
          }}
        /> 
          <Stack.Screen 
          name="Detalles"
          component={DetailsNotes} 
          options={{
            title: "DETALLES DE NOTAS",
            headerTitleAlign: "center",
            headerStyle: {backgroundColor: "#8B1874"},
            headerTintColor: "white"
          }}
        /> 
        
    
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
