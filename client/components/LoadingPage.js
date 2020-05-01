import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { logout, loggedIn } from '../redux/ActionCreators';
import * as SecureStore from 'expo-secure-store';

class LoadingPage extends Component {
  // state = {
  //   username: '',
  //   password: '',
  // };
  // componentDidMount() {
  //   this.props.logout();
  //   SecureStore.getItemAsync('userinfo').then((userdata) => {
  //     const userinfo = JSON.parse(userdata);
  //     console.log('THIS IS THE USER INFO ON THE LOADING PAGE', userinfo);
  //     if (userinfo) {
  //       this.setState(
  //         {
  //           username: userinfo.username,
  //           password: userinfo.password,
  //         },
  //         () => this.handleSubmit()
  //       );
  //     }
  //   });
  // }

  // handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log('NOW ATTEMPTING TO LOG IN ON THE ');
  //   const { navigate } = this.props.navigation;
  //   const { username, password } = this.state;
  //   console.log('USERNAME', username);
  //   if (!username) {
  //     this.setState({
  //       message: `You must include a username`,
  //     });
  //   } else if (!password) {
  //     this.setState({
  //       message: `You must include a password`,
  //     });
  //   } else {
  //     let today = new Date();
  //     var start = new Date(today.getFullYear(), 0, 0);
  //     var diff =
  //       today -
  //       start +
  //       (start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000;
  //     var oneDay = 1000 * 60 * 60 * 24;
  //     let a = today.toString().split(' ');
  //     var day = Math.floor(diff / oneDay);
  //     let year = a[3];
  //     let state = { username, password, day, year };
  //     fetch(`${localSource}/login`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(state),
  //     })
  //       .then((response) => response.json())
  //       .then((results) => {
  //         if (
  //           results.message == 'Incorrect username.' ||
  //           results.message == 'Incorrect password.' ||
  //           results.message == 'Unauthorized'
  //         ) {
  //           this.setState({
  //             message: 'Incorrect username or password!',
  //           });
  //         } else if (results.message == 'This account was deleted') {
  //           this.setState({
  //             message: 'This account was deleted.',
  //           });
  //         }
  //         // this.props.logIt(results);
  //         else {
  //           // console.log(results);
  //           this.props.loggedIn(results);
  //           SecureStore.setItemAsync(
  //             'userinfo',
  //             JSON.stringify({
  //               username: this.state.username,
  //               password: this.state.password,
  //             })
  //           );
  //           navigate('See Logs');
  //         }
  //       })
  //       .catch((error) => {
  //         this.setState({
  //           message: `Something went wrong`,
  //         });
  //       });
  //   }
  // };

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
    // transform: [{ rotate: '20deg' }],
  },
});
