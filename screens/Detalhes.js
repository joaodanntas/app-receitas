import { useState, useEffect } from 'react';
import { ScrollView, Text, View, Alert, StyleSheet } from 'react-native';

import Cabecalho from '../components/Cabecalho';
import Botao from '../components/Botao';

export default function Detalhes({ route, navigation, receitas, aoAlternarFavorita, aoExcluir }) {
  const [segundos, setSegundos] = useState(0);

  // Cronômetro do tempo na tela, com limpeza ao sair
  useEffect(() => {
    const intervalo = setInterval(() => {
      setSegundos((anterior) => anterior + 1);
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  // Busca a versão atual da receita na lista (o parâmetro da rota é só uma "foto" de quando abriu)
  const receita = receitas.find((item) => item.id === route.params.receita.id);

  // Depois de excluir, a receita deixa de existir por um instante antes da tela fechar
  if (!receita) {
    return null;
  }

  const confirmarExclusao = () => {
    Alert.alert('Excluir receita', `Deseja excluir "${receita.nome}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          navigation.goBack();
          aoExcluir(receita.id);
        },
      },
    ]);
  };

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
          titulo={receita.favorita ? '★ Remover dos favoritos' : '☆ Marcar como favorita'}
          secundario={!receita.favorita}
          aoPressionar={() => aoAlternarFavorita(receita.id)}
        />
      </View>

      <View style={estilos.botao}>
        <Botao titulo="Excluir receita" secundario aoPressionar={confirmarExclusao} />
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
    marginTop: 12,
  },
});
