import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Button, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import PropTypes from 'prop-types';
import { API_URL } from '@env';
import AuthContext from './authContext';

export default function PaginaPrincipal({ navigation }){
    const { signOut, notification } = React.useContext(AuthContext);
    const [nomeUsuario, setUsuario] = useState('');

    async function testeDeAuth(){
        const credentials = await SecureStore.getItemAsync('token');
        console.log(credentials);
        console.log(credentials);
        
        axios.post(API_URL + 'user/authTest', { token: credentials })
        .then(res => console.log(res.data));
      };

    useEffect(() => {
        async function getInfoFromDatabase(){
            const credentials = await SecureStore.getItemAsync('token');
            console.log(credentials);
            axios.post(API_URL + 'user/getInfo', { token: credentials })
            .then(res => {
                console.log(res.data);
                console.log(res.data.usuario.email);
                setUsuario(res.data.usuario.email);
            });
        }
        getInfoFromDatabase();
    }, []);

    return(
        <View>
            <Text>Ola {nomeUsuario}</Text>
            <Button onPress={testeDeAuth} title="Teste de auth"></Button>
            <Button onPress={() => signOut()} title="Teste de sair"></Button>
        </View>
    );
}

PaginaPrincipal.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };
