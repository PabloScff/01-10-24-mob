import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

export default function ListaItem({ item, onRemove }) {
  return (
    <View style={styles.itemContainer}>
      <Image source={item.imagem} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.nome}</Text>
      <Text style={styles.itemPrice}>{item.preco}</Text>
      <Button title="Remover" color="red" onPress={onRemove} />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: '#6f7070', //fundo do card
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },

 

  itemImage: {
    width: 100,
    height: 100,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color:'black',
   
  },
  itemPrice: {
    fontSize: 14,
    color: 'blue',
  },
});
