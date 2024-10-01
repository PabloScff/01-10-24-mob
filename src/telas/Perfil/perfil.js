import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import {TouchableOpacity} from "react-native";
import { Alert,} from 'react-native';
import Botao from '../../componentes/Botao';




export default function Perfil() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value='0' // Exemplo 01
      />
      <TextInput
        style={styles.input}
        placeholder='Digite seu nome' // Exemplo 02
      />
      <TextInput
        style={styles.input}
        keyboardType='numeric' // Exemplo 03
      />

      <Botao textoBotao="Concluir" acaoBotao={() => Alert.alert('Cadastro Concluido!')} />
    </View>
  );
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#00d4ff',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    marginBottom: 16,
  },
});
