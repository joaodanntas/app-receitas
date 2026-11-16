import { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

import Cabecalho from '../components/Cabecalho';
import Botao from '../components/Botao';

export default function Detalhes({ route }) {
  const { receita } = route.params;
  const [favorita, setFavorita] = useState(false);
  const [segundos, setSegundos] = useState(0);

  // Cronômetro do tempo na tela, com limpeza ao sair
  useEffect(() => {
    const intervalo = setInterval(() => {
      setSegundos((anterior) => anterior + 1);
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo}>
      <Cabecalho
        titulo={receita.nome}
        subtitulo={`${receita.categoria} • ${receita.tempo} min`}
      />

      <Text style={estilos.secao}>Ingredientes</Text>
      {receita.ingredientes.map((ingrediente, indice) => (
        <Text key={indice} style={estilos.item}>
          • {ingrediente}
        </Text>
      ))}

      <Text style={estilos.secao}>Modo de preparo</Text>
      <Text style={estilos.item}>{receita.preparo}</Text>

      <Text style={estilos.tempo}>Você está nesta tela há {segundos}s</Text>

      <View style={estilos.botao}>
        <Botao
          titulo={favorita ? 'Remover dos favoritos' : 'Marcar como favorita'}
          secundario={!favorita}
          aoPressionar={() => setFavorita(!favorita)}
        />
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  conteudo: {
    padding: 16,
  },
  secao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c0392b',
    marginTop: 16,
    marginBottom: 6,
  },
  item: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 24,
  },
  tempo: {
    marginTop: 20,
    fontSize: 14,
    color: '#7f8c8d',
  },
  botao: {
    marginTop: 16,
  },
});
