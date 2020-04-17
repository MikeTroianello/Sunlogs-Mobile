import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const LoadingPage = () => {
  return (
    <View style={s.container}>
      <Text style={s.text}>SUNLOGS</Text>
      <Image style={s.icon} source={require('../assets/sun.png')} />
    </View>
  );
};

export default LoadingPage;

const s = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e7ef',
  },
  text: {
    marginVertical: '8%',
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
  },
  icon: {
    marginVertical: '20%',
    justifyContent: 'center',
    alignContent: 'center',
    // transform: [{ rotate: '20deg' }],
  },
});
