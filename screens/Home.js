import { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';

import Card from '../components/Card';
import Botao from '../components/Botao';
import Cabecalho from '../components/Cabecalho';
import CampoTexto from '../components/CampoTexto';
import { categorias } from '../data/receitas';

export default function Home({ navigation, receitas }) {
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todas');
  const [carregando, setCarregando] = useState(true);

  // Simula o carregamento dos dados ao abrir a tela (executa uma vez)
  useEffect(() => {
    const temporizador = setTimeout(() => setCarregando(false), 800);
    return () => clearTimeout(temporizador); // limpeza
  }, []);

  // Atualiza o título do cabeçalho quando a quantidade de receitas muda
  useEffect(() => {
    navigation.setOptions({ title: `Minhas Receitas (${receitas.length})` });
  }, [receitas.length]);

  const receitasFiltradas = receitas.filter((receita) => {
    const nomeCombina = receita.nome.toLowerCase().includes(busca.toLowerCase());
    const categoriaCombina = categoria === 'Todas' || receita.categoria === categoria;
    return nomeCombina && categoriaCombina;
  });

  if (carregando) {
    return (
      <View style={estilos.centro}>
        <ActivityIndicator size="large" color="#c0392b" />
        <Text style={estilos.textoCentro}>Carregando receitas...</Text>
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <Cabecalho
        titulo="O que vamos cozinhar?"
        subtitulo={`${receitasFiltradas.length} receita(s) encontrada(s)`}
      />

      <CampoTexto
        label="Buscar"
        valor={busca}
        aoMudarTexto={setBusca}
        placeholder="Digite o nome da receita"
      />

      <View style={estilos.filtros}>
        {categorias.map((cat) => (
          <Botao
            key={cat}
            titulo={cat}
            pequeno
            secundario={categoria !== cat}
            aoPressionar={() => setCategoria(cat)}
          />
        ))}
      </View>

      <FlatList
        data={receitasFiltradas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Card
            titulo={item.nome}
            subtitulo={`${item.categoria} • ${item.tempo} min`}
            aoPressionar={() => navigation.navigate('Detalhes', { receita: item })}
          />
        )}
        ListEmptyComponent={
          <Text style={estilos.vazio}>Nenhuma receita encontrada.</Text>
        }
      />

      <Botao titulo="Adicionar receita" aoPressionar={() => navigation.navigate('Formulario')} />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f6fa',
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
  },
  textoCentro: {
    marginTop: 10,
    fontSize: 16,
    color: '#7f8c8d',
  },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  vazio: {
    textAlign: 'center',
    fontSize: 16,
    color: '#7f8c8d',
    marginVertical: 30,
  },
});
