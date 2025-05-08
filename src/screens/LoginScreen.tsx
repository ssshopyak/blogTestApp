import React, {FC, useState, JSX} from 'react';
import {StyleSheet, View, KeyboardAvoidingView, Text, Platform} from 'react-native';
import {Colors} from '@constants';
import {Button, Input} from '@components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootStackNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: FC<Props> = ({}): JSX.Element => {
  const [accountCode, setAccountCode] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const insets = useSafeAreaInsets();

  const attemptToAuthenticate = async () => {
    console.log('test')
    // try {
    //   if (!accountCode || !login || !password) {
    //     showError('Введіть дані');
    //     return;
    //   }
    //   setIsLoading(true);
    //   const res = await toAuth({accountCode, login, password});
    //   if (res.status === 200) {
    //     AuthStore.setUserInfo(res.data);
    //     storeData(res.data, 'userData');
    //     getData('authData').then(response => {
    //       if (response) {
    //         const tempData = [
    //           ...response,
    //           {
    //             id: response.length + 1,
    //             title: accountCode,
    //             login: login,
    //             password: password,
    //           },
    //         ];
    //         var valueArr = tempData.map(function (item) {
    //           return item.title;
    //         });
    //         var isDuplicate = valueArr.some(function (item, idx) {
    //           return valueArr.indexOf(item) !== idx;
    //         });
    //         if (!isDuplicate) {
    //           storeData(
    //             [
    //               ...response,
    //               {
    //                 id: response.length + 1,
    //                 title: accountCode,
    //                 login: login,
    //                 password: password,
    //               },
    //             ],
    //             'authData',
    //           );
    //         }
    //       } else {
    //         console.log('else');
    //         storeData(
    //           [
    //             {
    //               id: 1,
    //               title: accountCode,
    //               login: login,
    //               password: password,
    //             },
    //           ],
    //           'authData',
    //         );
    //       }
    //     });
    //     AuthStore.setAccounntId(res.data.accountId);
    //     AuthStore.toLogin();
    //   }
    // } catch (error) {
    //   console.log('error', error);
    //   if (axios.isAxiosError(error) && error.response) {
    //     switch (error.response.status) {
    //       case 401: // User not found
    //         showError('Користувача не знайдено');
    //         break;
    //       case 403: // Access denided
    //         showError('Не правильні дані для входу');
    //         break;
    //       default:
    //         showError('Щось пішло не так');
    //         break;
    //     }
    //   }
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom > 0 ? insets.bottom : 20}]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <Input value={login} setValue={setLogin} title="Login" isPassword={false} keyboardType={'default'} />
            <Input
              value={password}
              setValue={setPassword}
              title="Password"
              isPassword={true}
              keyboardType={'default'}
            />
          </View>
          <View style={styles.buttonContainer}>
          <Button
            isLoading={isLoading}
            isBig={true}
            title={'LOG IN'}
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
