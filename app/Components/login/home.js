import React from 'react';
import { View, TextInput, StyleSheet, Button, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import PropTypes from 'prop-types';
import { API_URL } from '@env';

export default function Home({ navigation }){
    async function testeDeAuth(){
        const credentials = await SecureStore.getItemAsync('token');
        console.log(credentials);
        axios.post(API_URL + 'user/authTest', { token: credentials })
        .then(res => console.log(res.data));
      };

    return(
        <View>
            <Text>Ola marilene</Text>
            <Button onPress={testeDeAuth} title="Teste de auth"></Button>
        </View>
    );
}

Home.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };
