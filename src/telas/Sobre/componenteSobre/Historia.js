import React, { useRef, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Video, ResizeMode } from 'expo-av';

import logo from '../../../../assets/logo_final (1).png';
import fome from '../../../../assets/preto.png'; // Note que essa imagem não é usada no código atual
import Texto from '../../../componentes/Texto';
import estilosOriginais from '../estilos'; // Renomeie para evitar conflitos

export default function Historia({ traje }) {
  // Refs e estados para o vídeo
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <View style={estilosOriginais.container}>
      <Image style={estilosOriginais.logo} source={logo} resizeMode="contain" />
      <Texto style={estilosOriginais.trajetoria}>{traje}</Texto>
      
      {/* Componente Video */}
      <Video
        ref={videoRef}
        source={{ uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }} // Substitua com a URL do seu vídeo
        style={estilos.video}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      
      {/* Comentado: Código original da imagem */}
      {/* <Image style={estilosOriginais.im} source={fome} resizeMode="contain" /> */}
    </View>
  );
}

// Adicione estilos adicionais para o vídeo
const estilos = StyleSheet.create({
  video: {
    width: '100%',
    height: 200, // Ajuste a altura conforme necessário
    backgroundColor: 'black', // Cor de fundo para o vídeo
    borderBlockColor: 'white',
    marginTop:15
  },
});
