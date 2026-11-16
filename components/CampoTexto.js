import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function CampoTexto({
  label,
  valor,
  aoMudarTexto,
  placeholder,
  multilinha = false,
  teclado = 'default',
}) {
  return (
    <View style={estilos.container}>
      <Text style={estilos.label}>{label}</Text>
      <TextInput
        style={[estilos.campo, multilinha && estilos.campoGrande]}
        value={valor}
        onChangeText={aoMudarTexto}
        placeholder={placeholder}
        multiline={multilinha}
        keyboardType={teclado}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  campo: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  campoGrande: {
    height: 100,
    textAlignVertical: 'top',
  },
});
