import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Detalhes from './screens/Detalhes';
import Formulario from './screens/Formulario';
import { receitasIniciais } from './data/receitas';

const Stack = createNativeStackNavigator();

export default function App() {
  // Lista de receitas fica aqui para ser compartilhada entre as telas
  const [receitas, setReceitas] = useState(receitasIniciais);

  const adicionarReceita = (novaReceita) => {
    setReceitas((anteriores) => [...anteriores, novaReceita]);
  };

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#c0392b' },
          headerTintColor: '#ffffff',
        }}
      >
        <Stack.Screen name="Home" options={{ title: 'Minhas Receitas' }}>
          {(props) => <Home {...props} receitas={receitas} />}
        </Stack.Screen>

        <Stack.Screen
          name="Detalhes"
          component={Detalhes}
          options={({ route }) => ({ title: route.params.receita.nome })}
        />

        <Stack.Screen name="Formulario" options={{ title: 'Nova Receita' }}>
          {(props) => <Formulario {...props} aoSalvar={adicionarReceita} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
