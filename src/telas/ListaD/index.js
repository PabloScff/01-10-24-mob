import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, StatusBar, Alert } from 'react-native';
import Texto from "../../componentes/Texto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListaItem from "./ListaItem"; // Componente para renderizar o item da lista

export default function Index() {
  const [listaData, setListaData] = useState([]);

  // Carregando dados do AsyncStorage
  const loadListData = async () => {
    try {
      const storage = await AsyncStorage.getItem('ListaDesejos');
      if (storage !== null) {
        const storedList = JSON.parse(storage);
        setListaData(storedList);
        console.log(storedList);
      }
    } catch (error) {
      console.error('Erro ao carregar a lista de desejos:', error);
    }
  };

  useEffect(() => {
    loadListData();
  }, []);

  // Função para remover item da lista de desejos
  const removeItem = async (itemToRemove) => {
    try {
      const updatedList = listaData.filter(item => item.nome !== itemToRemove.nome);
      setListaData(updatedList);
      await AsyncStorage.setItem('ListaDesejos', JSON.stringify(updatedList));
      console.log(`Item ${itemToRemove.nome} removido.`);
    } catch (error) {
      console.error('Erro ao remover item da lista de desejos:', error);
    }
  };

  const handleRemoveItem = (item) => {
    Alert.alert(
      "Remover item",
      `Tem certeza que deseja remover ${item.nome} da lista de desejos?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover", onPress: () => removeItem(item) }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <ListaItem item={item} onRemove={() => handleRemoveItem(item)} />
  );

  return (
    <View style={styles.container}>
      <StatusBar />
      <Texto style={styles.title}>Lista de Desejos</Texto>
      <Texto style={styles.subtitle}>Esses são os produtos adicionados:</Texto>

      {listaData.length > 0 ? (
        <FlatList
          data={listaData}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          numColumns={2}
        />
      ) : (
        <Texto style={styles.emptyText}>Sua lista de desejos está vazia.</Texto>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "black", //Fundo da tela de desejos
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white', //Lista de desejos
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: 'white'
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});
