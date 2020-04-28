import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../../redux/ActionCreators';

import { localSource } from '../../assets/localSource';

import * as SecureStore from 'expo-secure-store';

class Logout extends Component {
  loggingOut = () => {
    const { navigate } = this.props.navigation;
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
      <View>
        <Text>Do you want to logout?</Text>
        <Button onPress={this.loggingOut} title='Log Out' />
        <Button
          onPress={() => this.props.navigation.navigate('See Logs')}
          title='Never Mind'
        />
      </View>
    );
  }
}

// const logoutfunc = () => {
//   // const { navigate } = props.navigation;
//   console.log('ATTEMPTING TO LOG OUT');
//   return fetch(`${localSource}/logout`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: null,
//   })
//     .then((response) => response.json())
//     .then((results) => {
//       SecureStore.deleteItemAsync('userinfo').catch((error) =>
//         console.log('Could not delete user info', error)
//       );
//       console.log(results);
//       props.logout();
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// const Logout = () => {
//   return(
//     <View>
//       <Text>Do You Want to log out?</Text>
//     </View>
//   )
// }

const mapDispatchToProps = {
  logout: () => logout(),
};

export default connect(null, mapDispatchToProps)(Logout);
