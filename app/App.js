import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Components/login/login';
import Home from './Components/login/home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import AuthContext from './Components/login/authContext';
import ToastManager, { Toast } from 'toastify-react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('token');
      } catch (e) {
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: 'SIGN_IN', token: data.userToken });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        dispatch({ type: 'SIGN_IN', token: data.userToken });
      },
      notification: (message, type) => {
        console.log('notification called');
        if (type === "ERROR"){
          Toast.error(message);
          return;
        }
        if (type === "SUCESS"){
          Toast.success(message);
          return;
        }
        if (type === "INFO"){
          Toast.info(message);
          return;
        }
        if (type === "WARN"){
          Toast.warn(message);
          return;
        }

        
      }
    }),
    []
  );

  /* https://github.com/calintamas/react-native-toast-message/blob/main/docs/navigation-usage.md */
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
          {state.userToken == null
          ? (<Stack.Screen name="Login" component={Login}/>)
          : (<Stack.Screen name="Home" component={Home}/>)}
        </Stack.Navigator>
      </NavigationContainer>
      <ToastManager/>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
