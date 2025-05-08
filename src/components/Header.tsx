import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Colors} from '@constants';
import {Arrow, Logout} from '@assets';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootStackNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { useAppDispatch, logout } from '../redux/slices/authSlices';

export default function Header({
  title,
  isArrow,
  isLogout = false,
}: {
  title: string;
  isArrow: boolean;
  isLogout?: boolean;
}) {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  return (
    <View style={[styles.container]}>
      <View style={[styles.header, {marginTop: insets.top > 0 ? insets.top - 15 : 0}]}>
        {isArrow ? (
          <TouchableOpacity
            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
            style={styles.arrowContainer}
            onPress={() => {
              navigation.goBack();
            }}>
            <Arrow style={{color: Colors.black}} />
          </TouchableOpacity>
        ) : null}
        <Text style={[styles.textStyle]}>{title}</Text>
        {isLogout ? (
          <TouchableOpacity
            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
            style={styles.arrowContainer}
            onPress={() => {
              dispatch(logout());
          }}>
            <Logout style={{color: Colors.black}} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.background,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 30,
    width: '100%',
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    height: 70,
  },
  textStyle: {
    alignSelf: 'center',
    fontFamily: 'ProductSans',
    fontWeight: '700',
    fontSize: 21,
    color: '#2E2828E5',
  },
  arrowContainer: {
    position: 'absolute',
    left: 15,
  },
  profileContainer: {
    position: 'absolute',
    right: 15,
  },
});
