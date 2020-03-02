import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Input } from 'react-native-elements';

import { Styles } from '../../styles/MainStyles';

import { localSource } from '../../assets/localSource';

class Login extends Component {
  state = {
    message: null,
    user: '',
    username: '',
    password: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    const { navigate } = this.props.navigation;
    const { username, password } = this.state;
    if (!username) {
      this.setState({
        message: `You must include a username`
      });
    } else if (!password) {
      this.setState({
        message: `You must include a password`
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
      const state = { username, password, day, year };
      console.log('GOING FOR IT');
      fetch(`${localSource}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
      })
        .then(response => response.json())
        .then(results => {
          // this.props.logIt(results);
          console.log(results);
          navigate('Create Log');
        })
        .catch(error => {
          this.setState({
            message: `Username already exists!`
          });
        });
    }
  };

  render() {
    return (
      <View style={Styles.container}>
        <Text className='signup-header'>Log In</Text>
        <View className='form-pieces'>
          <View className='form-piece'>
            <Text>Username:</Text>
            <Input
              textContentType='username'
              placeholder='Your name...'
              onChangeText={text => this.setState({ username: text })}
              value={this.state.username}
            />
          </View>
          <View className='form-piece'>
            <Text>Password:</Text>
            <Input
              autoCompleteType='password'
              textContentType='password'
              secureTextEntry={true}
              placeholder='******'
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
            />
          </View>
        </View>
        <View className='signup-button'>
          <Button title='Submit' onPress={this.handleSubmit} />
        </View>

        <Text className='signup-message'>{this.state.message}</Text>
      </View>
    );
  }
}

export default Login;
