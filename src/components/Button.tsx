import React, {JSX} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '@constants';
type Props = {
  title: string;
  backgroundColor: string;
  isBig: boolean;
  isLoading?: boolean;
  color: string;
  onPress(): void;
};

function Button({
  title,
  backgroundColor,
  isBig,
  color,
  onPress,
  isLoading = false,
}: Props): JSX.Element {
  return (
    <TouchableOpacity onPress={onPress} disabled={isLoading}>
      <View style={{...styles.container, backgroundColor: backgroundColor}}>
        {isLoading ? (
          <ActivityIndicator color={Colors.white} size={27} />
        ) : (
          <Text
            style={{...styles.text, color: color, fontSize: isBig ? 20 : 14}}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 18,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'ProductSans',
    fontWeight: '700',
  },
});

export default Button;
