import React from 'react';
import { View, TextInput, StyleSheet, Button, Text } from 'react-native';
import { Formik } from 'formik';

function Login(){
return (
  <Formik
    initialValues={{}}
    onSubmit={values => console.log(values)}
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
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.senha}
          style={styles.input}
          secureTextEntry={true}></TextInput>
        <Button onPress={handleSubmit} title="Login"></Button>
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

export default Login;
