import React, { Component } from 'react';
import { Text, TextInput, View, Button, Picker } from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { loggedIn } from '../../redux/ActionCreators';

import { Styles, SignUpCss, LoginCss } from '../../styles/MainStyles';
import { localSource } from '../../assets/localSource';

class SignUp extends Component {
  state = {
    message: null,
    user: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    gender: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    const { navigate } = this.props.navigation;
    const { username, password, gender } = this.state;
    console.log('READY TO SUBMIT', this.state);
    if (!username) {
      this.setState({
        message: `You must include a username`
      });
    } else if (!password) {
      this.setState({
        message: `You must include a password`
      });
    } else if (!gender) {
      this.setState({
        message: `You must include a gender`
      });
    } else {
      const state = this.state;
      fetch(`${localSource}/signup`, {
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
          this.props.loggedIn(results);
          navigate('See Logs');
        })
        .catch(error => {
          this.setState({
            message: `Username already exists!`
          });
        });
    }
  };

  handleChange = e => {
    console.log(e);
  };

  render() {
    return (
      <View style={{ color: '#e0e7ef' }}>
        <View style={LoginCss.wholePage}>
          <Text style={LoginCss.loginHeader}>Create an Account!</Text>
          <View style={LoginCss.loginComponent}>
            <View>
              <Text>Username:</Text>
              <Input
                placeholder='Your name...'
                onChangeText={text => this.setState({ username: text })}
                value={this.state.username}
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                leftIconContainerStyle={{
                  marginRight: 10,
                  marginLeft: 3
                }}
              />
            </View>
            <View>
              <Text>Password:</Text>
              <Input
                secureTextEntry={true}
                placeholder='6+ characters'
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
                leftIcon={{ type: 'font-awesome', name: 'key' }}
                leftIconContainerStyle={{
                  marginRight: 9,
                  marginLeft: 0
                }}
              />
            </View>
            <View>
              <Text>Email: (optional)</Text>
              <Input
                name='email'
                type='email'
                autoCompleteType='email'
                keyboardType='email-address'
                placeholder='Your email...'
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                leftIconContainerStyle={{
                  marginRight: 8,
                  marginLeft: -2
                }}
              />
            </View>
            <View>
              <Text>Phone: (optional)</Text>
              <Input
                name='phone'
                autoCompleteType='tel'
                keyboardType='phone-pad'
                pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                placeholder='867-5309'
                onChangeText={text => this.setState({ phone: text })}
                value={this.state.phone}
                leftIcon={{ type: 'font-awesome', name: 'phone' }}
                leftIconContainerStyle={{
                  marginRight: 10,
                  marginLeft: 3
                }}
              />
            </View>
            <View>
              <Text>What is your gender?</Text>
              <Picker
                selectedValue={this.state.gender}
                onValueChange={gender => this.setState({ gender })}
                placeholder='Choose your Gender'
              >
                <Picker.Item label='Choose' disabled={true} enabled={false} />
                <Picker.Item label='male' value='male' />
                <Picker.Item label='female' value='female' />
                <Picker.Item label='nonbinary' value='nonbinary' />
              </Picker>
            </View>
          </View>
          <View style={LoginCss.submitButton}>
            <Button title='Submit' onPress={this.handleSubmit} />
          </View>

          <Text>{this.state.message}</Text>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = {
  loggedIn: results => loggedIn(results)
};

export default connect(null, mapDispatchToProps)(SignUp);
