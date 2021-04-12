import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { logout, loggedIn } from '../redux/ActionCreators';
import * as SecureStore from 'expo-secure-store';

class LoadingPage extends Component {
  render() {
    return (
      <View style={s.container}>
        <Text style={s.text}>SUNLOGS</Text>
        <Image style={s.icon} source={require('../assets/sun.png')} />
      </View>
    );
  }
}

const mapDispatchToProps = {
  logout: () => logout(),
  loggedIn: () => loggedIn(),
};

export default connect(null, mapDispatchToProps)(LoadingPage);

const s = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8ec2ea',
  },
  text: {
    marginVertical: '8%',
    textAlign: 'center',
    fontSize: 45,
    fontWeight: 'bold',
  },
  icon: {
    marginVertical: '20%',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
