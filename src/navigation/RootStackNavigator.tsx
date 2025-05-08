import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  LoginScreen,
} from '@screens';

export type RootStackParamList = {
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  //const [initialRoute] = useState<keyof RootStackParamList>(AuthStore.isLogined ? 'Menu' : 'Login');

  return (
    <Stack.Navigator
      // key={initialRoute}
      // initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
      }}>
      {true ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
