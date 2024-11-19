import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Texto from '../../componentes/Texto';
import Botao from '../../componentes/Botao';

export default function Perfil() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState({
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: ''
  });
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Função para consultar o endereço via CEP
  const consultarEndereco = async (cep) => {
    if (cep.length === 8) { // Verifica se o CEP tem 8 caracteres
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (data.erro) {
          Alert.alert('Erro', 'CEP não encontrado.');
        } else {
          setEndereco({
            logradouro: data.logradouro,
            bairro: data.bairro,
            localidade: data.localidade,
            uf: data.uf
          });
        }
      } catch (error) {
        Alert.alert('Erro', 'Falha na consulta do CEP.');
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCadastro = () => {
    if (nome && email && senha && cep) {
      Alert.alert('Cadastro realizado com sucesso!', `Nome: ${nome}\nEmail: ${email}\nSenha: ${senha}\nCep: ${cep}`);
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Texto style={styles.permissionText}>Acesso à câmera foi negado.</Texto>;
  }

  return (
    <View style={styles.cameraContainer}>
      <TouchableOpacity onPress={pickImage} style={styles.cameraImageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.cameraImage} />
        ) : (
          <View style={styles.cameraPlaceholder}>
            <Texto style={styles.cameraPlaceholderText}>Tire uma foto</Texto>
          </View>
        )}
      </TouchableOpacity>

      <Texto style={styles.cameraLabel}>Nome</Texto>
      <TextInput
        style={styles.cameraInput}
        placeholder="Digite seu nome"
        placeholderTextColor="#aaa"
        value={nome}
        onChangeText={setNome}
      />

      <Texto style={styles.cameraLabel}>Email</Texto>
      <TextInput
        style={styles.cameraInput}
        placeholder="Digite seu email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Texto style={styles.cameraLabel}>Senha</Texto>
      <TextInput
        style={styles.cameraInput}
        placeholder="Digite sua senha"
        placeholderTextColor="#aaa"
        value={senha}
        onChangeText={setSenha}
        keyboardType="numeric"
        secureTextEntry
        maxLength={6}
      />

      <Texto style={styles.cameraLabel}>CEP</Texto>
      <TextInput
        style={styles.cameraInput}
        placeholder="Digite seu CEP"
        placeholderTextColor="#aaa"
        value={cep}
        onChangeText={(text) => {
          setCep(text);
          consultarEndereco(text); // Consulta o endereço toda vez que o CEP for alterado
        }}
        keyboardType="numeric"
        maxLength={8}
      />

      {endereco.logradouro ? (
        <View style={styles.enderecoContainer}>
          <Texto style={styles.enderecoLabel}>Endereço</Texto>
          <Texto>{endereco.logradouro}</Texto>
          <Texto>{endereco.bairro}</Texto>
          <Texto>{endereco.localidade} - {endereco.uf}</Texto>
        </View>
      ) : null}

      <Botao textoBotao="Concluir" acaoBotao={handleCadastro} />
    </View>
  );
}

const styles = StyleSheet.create({
  // Estilo para o componente de câmera
  cameraContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  cameraImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  cameraImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  cameraPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPlaceholderText: {
    color: '#aaa',
  },
  cameraLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  cameraInput: {
    width: '80%',
    height: 40,
    borderColor: '#00d4ff',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  enderecoContainer: {
    marginTop: 16,
    width: '80%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  enderecoLabel: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  permissionText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#f00',
  },
});
