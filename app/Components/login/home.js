import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Button, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import PropTypes from 'prop-types';
import { API_URL } from '@env';
import AuthContext from './authContext';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import PaginaPrincipal from './paginaprincipal';
import * as Clipboard from 'expo-clipboard';
import EnviaHorarioDisponivel from '../horarios/enviaHorarioDisponivel';
import ReunioesMarcadas from '../horarios/reunioesMarcadas';
import GeradorDeLink from '../geradorDeLink/geradorDeLink';

const Drawer = createDrawerNavigator();

export default function Home({ navigation }){
    const { signOut, notification } = React.useContext(AuthContext);
    const [nomeUsuario, setUsuario] = useState('');

    async function testeDeAuth(){
        const credentials = await SecureStore.getItemAsync('token');
        axios.post(API_URL + 'user/authTest', { token: credentials })
        .then(res => {
            notification('USUÁRIO AUTENTICADO', 'SUCCESS');
        });
      };

    useEffect(() => {
        async function getInfoFromDatabase(){
            const credentials = await SecureStore.getItemAsync('token');
            console.log(credentials);
            axios.post(API_URL + 'user/getInfo', { token: credentials })
            .then(res => {
                setUsuario(res.data.usuario.email);
            }).catch(err => {
                if(err.request.status === 401){
                    notification('Sessão expirada.', 'ERROR');
                    signOut();
                }
            });
        }
        getInfoFromDatabase();
    }, []);

    return(
        <Drawer.Navigator>
            <Drawer.Screen name="Pagina principal" component={PaginaPrincipal}/>
            <Drawer.Screen name="Marcar horario" component={EnviaHorarioDisponivel}/>
            <Drawer.Screen name="Reunioes Marcas" component={ReunioesMarcadas}/>
            <Drawer.Screen name="Gerar link" component={GeradorDeLink}/>
        </Drawer.Navigator>
    );
}

Home.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };
