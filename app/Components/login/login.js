import React from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native';

function Login(){

return (
        <View>
            <Text> Usuario </Text>
            <TextInput style={styles.input}></TextInput>
            <Text> Senha </Text>
            <TextInput style={styles.input} secureTextEntry={true}></TextInput>

        </View>
    )
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

