import React, { useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Text,
  Platform,
  FlatList
} from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

export default function ReunioesMarcadas(){
  const [reunioes, setReunioes] = React.useState({});
  const isFocused = useIsFocused();

  async function pegarReunioesMarcadasBancoDeDados(){
    const credentials = await SecureStore.getItemAsync('token');

    axios.post(API_URL + 'reuniao/pegarReunioesAgendadas', {
      token: credentials
    }).then(res => {
      setReunioes(res.data);
    }).catch(e => {
      console.log(e);
    });
  }

  React.useEffect(() => {
    async function pegarReunioesMarcadasBancoDeDados(){
      const credentials = await SecureStore.getItemAsync('token');

      axios.post(API_URL + 'reuniao/pegarReunioesAgendadas', {
        token: credentials
      }).then(res => {
        setReunioes(res.data);
      }).catch(e => {
        console.log(e);
      });
    };
    pegarReunioesMarcadasBancoDeDados();
  }, [isFocused]);

  function parseData(stringDeData){
    const data = new Date(stringDeData);
    const dataRetomada = (data.getHours() < 10 ? '0' : '') + data.getHours() + ':' + (data.getMinutes() < 10 ? '0' : '') + data.getMinutes();

    return dataRetomada;
  }

  function parseDia(stringDeData){
    const parts = stringDeData.split('/');
    console.log(parts);
    const data = new Date(parts[2], (parts[1] - 1), parts[0]);
    console.log(`Data ${data}`);
    const diaDaSemana = data.getDay();
    switch(diaDaSemana){
      case 0:
        return 'Domingo';
      case 1:
        return 'Segunda-feira';
      case 2:
        return 'Terça-feira';
      case 3:
        return 'Quarta-feira';
      case 4:
        return 'Quinta-feira';
      case 5:
        return 'Sexta-feira';
      case 6:
        return 'Sábado';
      default:
        return 'erro';
    }
  }

  function parseDataDia(stringDeData){
    const data = new Date(stringDeData);
    const dataFinal = (data.getDate < 10 ? '0' : '') + data.getDate() + '/' +
                      (data.getMonth < 10 ? '0' : '') + (data.getMonth() + 1) + '/' +
                      data.getFullYear();
    return dataFinal;
  }

  return(
    <View>
      <FlatList
      keyExtractor={(item) => item._id}
      data={reunioes}
      extraData={reunioes}
      renderItem={({ item }) => {
        return(
        <View>
          <Text>Participantes: {item.participantes}</Text>
          <Text>Dia: {parseDia(item.dia)}, {item.dia} </Text>
          <Text>Inicio: {parseData(item.horarios.horarioInicio)}</Text>
          <Text>Fim: {parseData(item.horarios.horarioFim)}</Text>
          <Text>Link: {item.local}</Text>
        </View>
        );
      }}
      />
    </View>
  );
}
