import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Text,
  Platform,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import axios from 'axios';
import { API_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

function EnviaHorarioDisponivel() {
  const [showHorarioInicialPicker, setShowHorarioInicialPicker] =
    useState(false);
  const [showHorarioTerminoPicker, setShowHorarioTerminoPicker] =
    useState(false);
  const [showDiaPicker, setShowDiaPicker] = useState(false);
  const [dia, setDia] = useState(new Date());
  const [horarioInicial, setHorarioInicial] = useState(new Date());
  const [horarioTermino, setHorarioTermino] = useState(new Date());

  const onDiaChange = (event, selectedDia) => {
    const currentDia = selectedDia;
    setShowDiaPicker(false);
    console.log(`Dia selecionado ${currentDia}`);
    setDia(currentDia);
    console.log(`Dia setado ${dia}`);
  };

  const onHorarioInicialChange = (event, selectedHorarioInicial) => {
    const currentHorarioInicial = selectedHorarioInicial;
    setShowHorarioInicialPicker(false);
    console.log(`Horario selecionado: ${currentHorarioInicial}`);
    setHorarioInicial(currentHorarioInicial);
    console.log(`Horario inicial setado: ${horarioInicial}`);
  };

  const onHorarioTerminoChange = (event, selectedHorarioTermino) => {
    const currentHorarioTermino = selectedHorarioTermino;
    setShowHorarioTerminoPicker(false);
    console.log(`Horario selecionado: ${currentHorarioTermino}`);
    setHorarioTermino(currentHorarioTermino);
    console.log(`Horario termino setado: ${horarioTermino}`);
  };

  const showDiaPickerFunction = () => {
    if (Platform.OS === 'android') {
      setShowDiaPicker(true);
      // implementar botao para fechar
      // não faço a minima de como fazer isso para validar para iOS
    }
  };

  const showHorarioInicialPickerFunction = () => {
    if (Platform.OS === 'android') {
      setShowHorarioInicialPicker(true);
      // implementar botao para fechar
      // não faço a minima de como fazer isso para validar para iOS
    }
  };

  const showHorarioTerminoPickerFunction = () => {
    if (Platform.OS === 'android') {
      setShowHorarioTerminoPicker(true);
    }
  };

  async function enviarHorario() {
    const credentials = await SecureStore.getItemAsync('token');

    axios.post(API_URL + 'reuniao/adicionaHorario', {
      token: credentials,
      dia,
      horarioInicial,
      horarioTermino,
    });
  }

  return (
    <View>
      <Button title="Escolher data" onPress={showDiaPickerFunction}></Button>
      {showDiaPicker && (
        <DateTimePicker
          value={dia}
          mode="date"
          is24Hour={true}
          onChange={onDiaChange}
          minimumDate={Date.now()}
        />
      )}
      <Button
        title="Horario de Inicio"
        onPress={showHorarioInicialPickerFunction}
      ></Button>
      {showHorarioInicialPicker && (
        <DateTimePicker
          value={horarioInicial}
          mode="time"
          is24Hour={true}
          onChange={onHorarioInicialChange}
        />
      )}
      <Button
        title="Horario de Término"
        onPress={showHorarioTerminoPickerFunction}
      ></Button>
      {showHorarioTerminoPicker && (
        <DateTimePicker
          value={horarioTermino}
          mode="time"
          is24Hour={true}
          onChange={onHorarioTerminoChange}
        />
      )}
      <Text>
        Dia: {dia.getDate() + '/' + dia.getMonth() + '/' + dia.getFullYear()}
      </Text>
      <Text>
        Horario Inicial:{' '}
        {(horarioInicial.getHours() < 10 ? '0' : '') +
          horarioInicial.getHours() +
          ':' +
          (horarioInicial.getMinutes() < 10 ? '0' : '') +
          horarioInicial.getMinutes()}
      </Text>
      <Text>
        Horario Final:{' '}
        {(horarioTermino.getHours() < 10 ? '0' : '') +
          horarioTermino.getHours() +
          ':' +
          (horarioTermino.getMinutes() < 10 ? '0' : '') +
          horarioTermino.getMinutes()}
      </Text>
      <Button title="Enviar" onPress={enviarHorario}></Button>
    </View>
  );
}

export default EnviaHorarioDisponivel;
