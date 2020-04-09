import React, { Component } from 'react';
import { View, Text, Button, Modal } from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';

import SignUp from './SignUpComponent';

import { Styles, LoginCss } from '../../styles/MainStyles';

import { localSource } from '../../assets/localSource';
import { loggedIn } from '../../redux/ActionCreators';

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
        .then(async (results) => {
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
            console.log(results);
            let results = await this.props.loggedIn(results);
            navigate('See Logs');
          }
        })
        .catch((error) => {
          this.setState({
            message: `Something went wrong`,
          });
        });
    }
  };

  toggleModal = (nav) => {
    const { navigate } = this.props.navigation;
    if (nav) {
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

  render() {
    return (
      <View style={{ color: '#e0e7ef' }}>
        <View style={LoginCss.wholePage}>
          <View style={{ translateY: 40 }}>
            <Text style={LoginCss.loginHeader}>Welcome!</Text>
            <View>
              <Text style={{ textAlign: 'center', fontSize: 21 }}>
                Log in or{' '}
                <Text style={{ color: '#1d4f7c' }} onPress={this.toggleModal}>
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

const mapDispatchToProps = {
  loggedIn: (results) => loggedIn(results),
};

export default connect(null, mapDispatchToProps)(Login);
