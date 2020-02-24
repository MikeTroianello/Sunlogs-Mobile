import React, { Component } from 'react';
import { Text, View, Button, Picker } from 'react-native';
import { Input } from 'react-native-elements';
import { Styles } from '../../styles/MainStyles';
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
    const { username, password, gender } = this.state;
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
      this.service
        .signup(state)
        .then(results => {
          this.props.logIt(results);
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
      <View style={Styles.container}>
        <Text className='signup-header'>Create an Account!</Text>
        <View className='form-pieces'>
          <View className='form-piece'>
            <Text>Your Username:</Text>
            <Input
              placeholder='Your name...'
              onChangeText={text => this.setState({ username: text })}
              value={this.state.username}
            />
          </View>
          <View className='form-piece'>
            <Text htmlFor='password'>Password:</Text>
            <Input
              secureTextEntry={true}
              placeholder='6+ characters'
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
            />
          </View>
          <View className='form-piece'>
            <Text htmlFor='email'>Email: (optional)</Text>
            <Input
              name='email'
              type='email'
              autoCompleteType='email'
              keyboardType='email-address'
              placeholder='Your email...'
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
            />
          </View>
          <View className='form-piece'>
            <Text htmlFor='phone'>Phone: (optional)</Text>
            <Input
              name='phone'
              autoCompleteType='tel'
              keyboardType='phone-pad'
              pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
              placeholder='867-5309'
              onChangeText={text => this.setState({ phone: text })}
              value={this.state.phone}
            />
          </View>
          <View className='form-piece'>
            <Text htmlFor='gender'>What is your gender?</Text>
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
        <View className='signup-button'>
          <Button title='Submit' />
        </View>

        <Text className='signup-message'>{this.state.message}</Text>
      </View>
    );
  }
}

export default SignUp;