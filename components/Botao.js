import { Pressable, Text, StyleSheet } from 'react-native';

export default function Botao({ titulo, aoPressionar, secundario = false, pequeno = false }) {
  return (
    <Pressable
      style={[
        estilos.botao,
        secundario && estilos.botaoSecundario,
        pequeno && estilos.botaoPequeno,
      ]}
      onPress={aoPressionar}
    >
      <Text style={[estilos.texto, secundario && estilos.textoSecundario]}>{titulo}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  botao: {
    backgroundColor: '#c0392b',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c0392b',
  },
  botaoSecundario: {
    backgroundColor: '#ffffff',
  },
  botaoPequeno: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  texto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoSecundario: {
    color: '#c0392b',
  },
});
