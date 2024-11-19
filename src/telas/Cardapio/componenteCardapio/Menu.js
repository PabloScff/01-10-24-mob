import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Button, Card } from "react-native-paper";
import Texto from '../../../componentes/Texto';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Menu({ item: { nome, preco, ingredientes, imagem } }) {
  const messages = [
    "Item Adicionado à Lista de Desejos",
  ];

  const handleHeartPress = async () => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    console.log(randomMessage);

    try {
      // Pega a lista atual de desejos do AsyncStorage
      const existingList = await AsyncStorage.getItem('ListaDesejos');
      let updatedList = existingList ? JSON.parse(existingList) : [];

      // Verifica se o item já está na lista de desejos
      const itemExists = updatedList.some(item => item.nome === nome);
      if (!itemExists) {
        // Adiciona o novo item à lista
        updatedList.push({ nome, preco, ingredientes, imagem });
        await AsyncStorage.setItem('ListaDesejos', JSON.stringify(updatedList));
        console.log('Item adicionado à lista de desejos:', nome);
      } else {
        console.log('Item já está na lista de desejos');
      }
    } catch (error) {
      console.error('Erro ao salvar na lista de desejos:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Card mode='elevated' style={styles.card}>
        <Card.Content>
          <Texto style={styles.name}>{nome}</Texto>
          <Texto style={styles.pre}>{preco}</Texto>
          <Texto style={styles.ingre}>{ingredientes}</Texto>
          <View style={styles.heartButton}>
            <Button onPress={handleHeartPress} style={styles.heart}>
              <AntDesign name="heart" size={24} color="red" />
            </Button>
          </View>
        </Card.Content>
        <Card.Cover style={styles.im} source={imagem} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    flex: 1,
  },
  heartButton: {
    alignItems: 'flex-end', // Alinha o botão à direita
    marginTop: 10,
  },
  heart: {
    backgroundColor: 'transparent', // Torna o botão transparente
    padding: 0, // Remove padding
  },
  im: {
    width: "100%",
    justifyContent: 'center',
  },
  card: {
    width: "100%",
    flexDirection: 'row',
    paddingTop: 10,
    margin: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  pre: {
    fontSize: 15,
  },
  ingre: {
    fontSize: 15,
  },
});
