import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Text>MainScreen</Text>
    </View>
  );
}
