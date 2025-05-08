import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  LoginScreen,
  MainScreen,
} from '@screens';
import { useAuth } from '../redux/slices/authSlices';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  const { isAuthorized } = useAuth();
  const [initialRoute] = useState<keyof RootStackParamList>(isAuthorized ? 'Main' : 'Login');

  return (
    <Stack.Navigator
      key={initialRoute}
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
      }}>
      {!isAuthorized ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Main" component={MainScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
