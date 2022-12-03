import React from 'react';
import { View, TextInput, StyleSheet, Button, Text } from 'react-native';
import AuthContext from '../login/authContext';
import * as SecureStore from 'expo-secure-store';
import { API_URL, WEBSITE_URL } from '@env';
import * as Clipboard from 'expo-clipboard';
import axios from 'axios';

export default function GeradorDeLink() {
  const { signOut, notification } = React.useContext(AuthContext);

  return (
    <View>
      <Button
        title="Gerar Link"
        onPress={async () => {
          const credentials = await SecureStore.getItemAsync('token');
          console.log(credentials);
          axios
            .post(API_URL + 'user/getInfo', { token: credentials })
            .then((res) => {
              Clipboard.setStringAsync(WEBSITE_URL + `?user=${res.data.usuario._id}`);
              console.log(res.data);
              notification('Link gerado com sucesso!', 'SUCCESS');
            })
            .catch((err) => {
              if (err.request.status === 401) {
                notification('Sessão expirada.', 'ERROR');
                signOut();
              }
            });
        }}
      />
    </View>
  );
}
