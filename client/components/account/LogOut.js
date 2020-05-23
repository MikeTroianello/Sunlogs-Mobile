import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../../redux/ActionCreators';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { localSource } from '../../assets/localSource';

import * as SecureStore from 'expo-secure-store';

class Logout extends Component {
  loggingOut = () => {
    // const { navigate } = this.props.navigation;
    console.log('ATTEMPTING TO LOG OUT');
    fetch(`${localSource}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: null,
    })
      .then((response) => response.json())
      .then((results) => {
        // this.props.logIt(results);
        SecureStore.deleteItemAsync('userinfo').catch((error) =>
          console.log('Could not delete user info', error)
        );
        console.log(results);
        this.props.logout();
      })
      .catch((error) => {
        this.setState({
          message: `FAILURE!`,
        });
      });
  };

  render() {
    return (
      <View style={s.logoutPage}>
        <View style={s.buttonBox}>
          <Text style={s.textHeader}>Do you want to logout?</Text>
          <View style={s.buttons}>
            <Button onPress={this.loggingOut} title='Log Out' />
          </View>
          <View style={s.buttons}>
            <Button
              onPress={() => this.props.navigation.navigate('See Logs')}
              title='Never Mind'
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = {
  logout: () => logout(),
};

export default connect(null, mapDispatchToProps)(Logout);

const s = StyleSheet.create({
  logoutPage: {
    paddingTop:
      Platform.OS === 'ios'
        ? getStatusBarHeight()
        : Expo.Constants.statusBarHeight,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#baccf1',
    // backgroundColor: 'linear-gradient(to bottom, #baccf1 0%, #8ec2ea 100%)',

    // 8ec2ea
  },
  textHeader: {
    translateY: -50,
    textAlign: 'center',
    fontSize: 32,
  },
  buttonBox: {
    height: '40%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',

    alignContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    textAlign: 'center',
    width: '80%',
    // marginHorizontal: '10%',
    // paddingVertical: '7%',
  },
});
