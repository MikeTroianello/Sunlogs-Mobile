import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../../redux/ActionCreators';

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
    );
  }
}

const mapDispatchToProps = {
  logout: () => logout(),
};

export default connect(null, mapDispatchToProps)(Logout);

const s = StyleSheet.create({
  logoutPage: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  textHeader: {
    translateY: -50,
    textAlign: 'center',
    fontSize: 32,
  },
  buttons: {
    textAlign: 'center',
    width: '80%',
    // marginHorizontal: '10%',
    marginVertical: '7%',
  },
});
