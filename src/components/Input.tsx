import React, {useState} from 'react';
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {Colors} from '@constants';
import {Hide, Show} from '@assets';

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  isPassword: boolean;
  keyboardType: KeyboardTypeOptions;
};

const Input = ({value, setValue, title, isPassword, keyboardType}: Props) => {
  const [isVisiblePass, setIsVisiblePass] = useState(true);

  const togglePasswordVisibility = () => {
    setIsVisiblePass(!isVisiblePass);
  };

  return (
    <View style={styles.SectionStyle}>
      <TextInput
        style={styles.inputStyle}
        onChangeText={text => setValue(text)}
        value={value}
        placeholder={title}
        placeholderTextColor={Colors.grey}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={isPassword ? isVisiblePass : false}
        keyboardType={keyboardType}
        // returnKeyType="next"
        // blurOnSubmit={false}
      />
      {isPassword && (
        <Pressable
          onPress={togglePasswordVisibility}
          style={styles.iconPasswordVisibility}>
          {isVisiblePass ? (
            <Show width={22} height={22} />
          ) : (
            <Hide width={22} height={22} />
          )}
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 48,
    width: '80%',
    marginVertical: 10,
  },
  inputStyle: {
    fontFamily: 'ProductSans',
    fontSize: 18,
    borderRadius: 18,
    paddingVertical: 10,
    paddingLeft: 15,
    flex: 1,
    backgroundColor: Colors.white,
    color: Colors.black,
  },
  iconPasswordVisibility: {
    position: 'absolute',
    alignSelf: 'center',
    right: 15,
  },
});

export default Input;
