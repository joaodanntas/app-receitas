import { Pressable, Text, StyleSheet } from 'react-native';

export default function Card({ titulo, subtitulo, aoPressionar }) {
  return (
    <Pressable style={estilos.card} onPress={aoPressionar}>
      <Text style={estilos.titulo}>{titulo}</Text>
      <Text style={estilos.subtitulo}>{subtitulo}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#c0392b',
    elevation: 2,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subtitulo: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
});
