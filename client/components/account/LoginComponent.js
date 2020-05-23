import React, { Component } from 'react';
import { View, Text, Button, Modal } from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import * as SecureStore from 'expo-secure-store';

import SignUp from './SignUpComponent';
import LandingPage from '../LandingPage';

import { Styles, LoginCss } from '../../styles/MainStyles';

import { localSource } from '../../assets/localSource';
import { loggedIn, returning } from '../../redux/ActionCreators';
import { userSettings } from '../../redux/userSettings';

class Login extends Component {
  state = {
    message: null,
    user: '',
    username: '',
    password: '',
    showModal: false,
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('THIS IS THE STATE: ', this.state);
    // console.log('THESE ARE THE PROPSss: ', this.props);
    const { navigate } = this.props.navigation;
    const { username, password } = this.state;
    console.log('USERNAME', username);
    if (!username) {
      this.setState({
        message: `You must include a username`,
      });
    } else if (!password) {
      this.setState({
        message: `You must include a password`,
      });
    } else {
      let today = new Date();
      var start = new Date(today.getFullYear(), 0, 0);
      var diff =
        today -
        start +
        (start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000;
      var oneDay = 1000 * 60 * 60 * 24;
      let a = today.toString().split(' ');
      var day = Math.floor(diff / oneDay);
      let year = a[3];
      let state = { username, password, day, year };
      fetch(`${localSource}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      })
        .then((response) => response.json())
        .then((results) => {
          if (
            results.message == 'Incorrect username.' ||
            results.message == 'Incorrect password.' ||
            results.message == 'Unauthorized'
          ) {
            this.setState({
              message: 'Incorrect username or password!',
            });
          } else if (results.message == 'This account was deleted') {
            this.setState({
              message: 'This account was deleted.',
            });
          }
          // this.props.logIt(results);
          else {
            //CHANGE THIS IF IT BREAKS
            this.setState(
              {
                message: 'Logging in...',
              },
              () => {
                this.props.loggedIn(results);
                SecureStore.setItemAsync(
                  'userinfo',
                  JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                  })
                );
                navigate('See Logs');
              }
            );
          }
        })
        .catch((error) => {
          this.setState({
            message: `Something went wrong`,
          });
        });
    }
  };

  toggleModal = (bool) => {
    const { navigate } = this.props.navigation;
    if (bool) {
      console.log('bool', bool);
      SecureStore.setItemAsync(
        'userinfo',
        JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      );
      this.setState(
        (prevState) => ({
          showModal: !prevState.showModal,
        }),
        () => navigate('See Logs')
      );
    } else {
      this.setState((prevState) => ({
        showModal: !prevState.showModal,
      }));
    }
  };

  setReturn = () => {
    console.log('SET RETUNNNNNRNRNRN');
    this.props.returning();
    // this.setState({
    //   returning: this.props.userSettings.returning,
    // });
  };

  render() {
    let returning;

    console.log('THE FINAL INFO', this.props.userSettings);
    console.log('THE FINAL RETURN', this.props.userSettings.returning);
    if (!this.props.userSettings.returning) {
      return <LandingPage setReturn={this.setReturn} />;
    } else {
      SecureStore.getItemAsync('userinfo').then((userdata) => {
        const userinfo = JSON.parse(userdata);
        console.log('THE USER INFO', userinfo);
        if (userinfo) {
          this.setState(
            { username: userinfo.username, password: userinfo.password },
            () => this.handleSubmit()
          );
        }
      });
      return (
        <View
          style={{
            color: '#e0e7ef',
          }}
        >
          <View style={LoginCss.wholePage}>
            <View style={{ translateY: 40 }}>
              <Text style={LoginCss.loginHeader}>Welcome!</Text>
              <View>
                <Text style={{ textAlign: 'center', fontSize: 21 }}>
                  Log in or{' '}
                  <Text
                    style={{ color: '#1d4f7c' }}
                    onPress={() => this.toggleModal(false)}
                  >
                    Click Here to Create an Account!
                  </Text>
                </Text>
              </View>
              <View style={LoginCss.loginComponent}>
                <Text>Username:</Text>
                <Input
                  textContentType='username'
                  placeholder='Your name...'
                  onChangeText={(text) => this.setState({ username: text })}
                  value={this.state.username}
                  leftIcon={{ type: 'font-awesome', name: 'user' }}
                  leftIconContainerStyle={{
                    marginRight: 10,
                    marginLeft: 3,
                  }}
                />

                <Text>Password:</Text>
                <Input
                  autoCompleteType='password'
                  textContentType='password'
                  secureTextEntry={true}
                  placeholder='******'
                  onChangeText={(text) => this.setState({ password: text })}
                  value={this.state.password}
                  leftIcon={{ type: 'font-awesome', name: 'key' }}
                  leftIconContainerStyle={{
                    marginRight: 10,
                    marginLeft: 3,
                  }}
                />
              </View>
              <View style={LoginCss.submitButton}>
                <Button title='Submit' onPress={this.handleSubmit} />
              </View>
              <Text style={{ textAlign: 'center', fontSize: 22, marginTop: 5 }}>
                {this.state.message}
              </Text>
            </View>
          </View>
          <Modal
            style={{ color: '#e0e7ef' }}
            animationType='slide'
            visible={this.state.showModal}
          >
            <View style={{ color: '#e0e7ef' }}>
              <SignUp
                toggleModal={this.toggleModal}
                navigation={this.props.navigation}
              />
            </View>
          </Modal>
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  userSettings: state.userSettings,
});

const mapDispatchToProps = {
  loggedIn: (results) => loggedIn(results),
  returning: () => returning(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
