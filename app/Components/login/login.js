import React from 'react';
import { View, TextInput, StyleSheet, Button, Text } from 'react-native';
import { Formik } from 'formik';
import { API_URL } from '@env';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import PropTypes from 'prop-types';

function Login({ navigation }){
  async function testeDeAuth(){
    const credentials = await SecureStore.getItemAsync('token');
    console.log(credentials);
    axios.post(API_URL + 'user/authTest', { token: credentials })
    .then(res => {
      console.log(res.data);
    });
  };

  return (
    <Formik
      initialValues={{}}
      onSubmit={values => {
        console.log(API_URL + 'user/login');
        axios.post(API_URL + 'user/login', values)
        .then(async res => {
          const token = res.data.token;
          const email = res.data.email;
          console.log(token);
          console.log(email);
          await SecureStore.setItemAsync('token', token);
          console.log('Usuario Salvo');
          navigation.navigate('Home');
        }).catch(err => console.log(err.response.data));
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <Text> Usuario </Text>
          <TextInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            style={styles.input}/>
          <Text> Senha </Text>
          <TextInput
            onChangeText={handleChange('senha')}
            onBlur={handleBlur('senha')}
            value={values.senha}
            style={styles.input}
            secureTextEntry={true}></TextInput>
          <Button onPress={handleSubmit} title="Login"></Button>
          <Button onPress={testeDeAuth} title="Teste de auth"></Button>
        </View>
      )}
    </Formik>
      );
  }

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

Login.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

export default Login;
