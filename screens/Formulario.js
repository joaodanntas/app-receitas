import { useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

import CampoTexto from '../components/CampoTexto';
import Botao from '../components/Botao';
import { categorias } from '../data/receitas';

const formularioInicial = {
  nome: '',
  categoria: 'Doce',
  tempo: '',
  ingredientes: '',
  preparo: '',
};

export default function Formulario({ navigation, aoSalvar }) {
  const [form, setForm] = useState(formularioInicial);
  const [erro, setErro] = useState('');

  // Atualiza um campo sem alterar o objeto original (spread)
  const atualizarCampo = (campo, valor) => {
    setForm({ ...form, [campo]: valor });
  };

  const salvar = () => {
    if (form.nome.trim() === '' || form.ingredientes.trim() === '') {
      setErro('Preencha pelo menos o nome e os ingredientes.');
      return;
    }

    const novaReceita = {
      id: Date.now(),
      nome: form.nome.trim(),
      categoria: form.categoria,
      tempo: Number(form.tempo) || 0,
      ingredientes: form.ingredientes
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item !== ''),
      preparo: form.preparo.trim() || 'Sem modo de preparo informado.',
    };

    aoSalvar(novaReceita);
    navigation.goBack();
  };

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo}>
      <CampoTexto
        label="Nome"
        valor={form.nome}
        aoMudarTexto={(texto) => atualizarCampo('nome', texto)}
        placeholder="Ex: Bolo de cenoura"
      />

      <Text style={estilos.label}>Categoria</Text>
      <View style={estilos.categorias}>
        {categorias
          .filter((cat) => cat !== 'Todas')
          .map((cat) => (
            <Botao
              key={cat}
              titulo={cat}
              pequeno
              secundario={form.categoria !== cat}
              aoPressionar={() => atualizarCampo('categoria', cat)}
            />
          ))}
      </View>

      <CampoTexto
        label="Tempo de preparo (minutos)"
        valor={form.tempo}
        aoMudarTexto={(texto) => atualizarCampo('tempo', texto)}
        placeholder="Ex: 30"
        teclado="numeric"
      />

      <CampoTexto
        label="Ingredientes (separados por vírgula)"
        valor={form.ingredientes}
        aoMudarTexto={(texto) => atualizarCampo('ingredientes', texto)}
        placeholder="Ex: 3 ovos, 2 xícaras de farinha"
        multilinha
      />

      <CampoTexto
        label="Modo de preparo"
        valor={form.preparo}
        aoMudarTexto={(texto) => atualizarCampo('preparo', texto)}
        placeholder="Descreva o passo a passo"
        multilinha
      />

      {erro !== '' && <Text style={estilos.erro}>{erro}</Text>}

      <Botao titulo="Salvar receita" aoPressionar={salvar} />
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
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 6,
  },
  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  erro: {
    color: '#c0392b',
    marginBottom: 12,
    fontSize: 14,
  },
});
