import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Button, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import PropTypes from 'prop-types';
import { API_URL } from '@env';
import AuthContext from './authContext';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PaginaPrincipal from './paginaprincipal';
import { Toast } from 'toastify-react-native';

const Drawer = createDrawerNavigator();

export default function Home({ navigation }){
    const { signOut, notification } = React.useContext(AuthContext);
    const [nomeUsuario, setUsuario] = useState('');

    async function testeDeAuth(){
        const credentials = await SecureStore.getItemAsync('token');
        console.log(credentials);
        console.log('ae');
        notification('epa');
        axios.post(API_URL + 'user/authTest', { token: credentials })
        .then(res => {
            console.log(res.data);
            notification('OI!');
            Toast.info('p');
        });
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
        <Drawer.Navigator>
            <Drawer.Screen name="Pagina principal" component={PaginaPrincipal}/>
        </Drawer.Navigator>
    );
}

Home.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };
