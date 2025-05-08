import React, {FC, useState} from 'react';
import {StyleSheet, View, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import {Colors} from '@constants';
import {Button, Input} from '@components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootStackNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import {setUser} from '../redux/slices/authSlices';
import {useDispatch} from 'react-redux';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: FC<Props> = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const attemptToAuthenticate = async () => {
    if (!login || !password) {
      Alert.alert('Помилка', 'Введіть email та пароль');
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await auth().signInWithEmailAndPassword(login, password);
      const user = userCredential.user;
      console.log('Успішний логін:', user.email);
      dispatch(setUser({ uid: user.uid, email: user.email }));
    } catch (error: any) {
      console.log('Login error:', error.code);
      switch (error.code) {
        case 'auth/user-not-found':
          Alert.alert('Помилка', 'Користувача не знайдено');
          break;
        case 'auth/wrong-password':
          Alert.alert('Помилка', 'Неправильний пароль');
          break;
        case 'auth/invalid-email':
          Alert.alert('Помилка', 'Невалідний email');
          break;
        default:
          Alert.alert('Помилка', 'Щось пішло не так');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <Input value={login} setValue={setLogin} title="Email" isPassword={false} keyboardType="email-address" />
            <Input value={password} setValue={setPassword} title="Password" isPassword keyboardType="default" />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              isLoading={isLoading}
              isBig
              title="LOG IN"
              onPress={attemptToAuthenticate}
              backgroundColor={Colors.blue}
              color={Colors.white}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    backgroundColor: '#2E2828E5',
  },
  contentContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default LoginScreen;
