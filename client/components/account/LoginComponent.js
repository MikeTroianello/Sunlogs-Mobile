import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Input } from 'react-native-elements';

import { Styles } from '../../styles/MainStyles';

class Login extends Component {
  state = {
    message: null,
    user: '',
    username: '',
    password: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
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
      this.service
        .login(username, password, day, year)
        .then(results => {
          this.setState({
            username: '',
            password: '',
            message: results.message || null
          });

          if (!results.message) {
            localStorage.setItem('user', JSON.stringify(results));
            this.props.logIt(results);
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({
            message: `Incorrect Username or Password`
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
          <Button title='Submit' />
        </View>

        <Text className='signup-message'>{this.state.message}</Text>
      </View>
    );
  }
}

export default Login;
