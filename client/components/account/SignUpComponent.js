import React, { Component } from 'react';
import { Text, TextInput, View, Button, Picker, Alert } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { loggedIn } from '../../redux/ActionCreators';

import {
  Styles,
  SignUpCss,
  LoginCss,
  FilterStyle,
} from '../../styles/MainStyles';
import { localSource } from '../../assets/localSource';

class SignUp extends Component {
  state = {
    message: null,
    user: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    gender: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { navigate } = this.props.navigation;
    const { username, password, gender } = this.state;
    console.log('READY TO SUBMIT', this.state);
    if (!username) {
      this.setState({
        message: `You must include a username`,
      });
    } else if (!password) {
      this.setState({
        message: `You must include a password`,
      });
    } else if (password.length < 6) {
      this.setState({
        message: `Password must be at least 6 characters`,
      });
    } else if (!gender) {
      this.setState({
        message: `You must include a gender`,
      });
    } else {
      const state = this.state;
      fetch(`${localSource}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      })
        .then((response) => response.json())
        .then((results) => {
          if (results.error) {
            console.log(results.error);
            this.setState({
              message: results.error,
            });
          } else {
            Alert.alert(
              'Welcome to Sunlogs',
              'If you ever get lost, swipe from the left side of your screen to open the option drawer!',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    this.props.loggedIn(results);
                    // this.props.navigation.navigate('Profile');
                    this.props.toggleModal(true);
                  },
                },
              ],
              { cancelable: false }
            );
            // console.log('THIS IS PERCEIVED TO BE A SUCCESS', results);
            // this.props.loggedIn(results);
            // this.props.navigate('Profile');
            // this.props.toggleModal();
          }
          // this.props.logIt(results);
        })
        .catch((error) => {
          this.setState({
            message: `Username already exists!`,
          });
        });
    }
  };

  handleChange = (e) => {
    console.log(e);
  };

  render() {
    return (
      <View style={LoginCss.wholePage}>
        <Text style={LoginCss.loginHeader}>Create an Account!</Text>
        <View style={LoginCss.loginComponent}>
          <View>
            <Text>Username:</Text>
            <Input
              placeholder='Your name...'
              onChangeText={(text) => this.setState({ username: text })}
              value={this.state.username}
              leftIcon={{ type: 'font-awesome', name: 'user' }}
              leftIconContainerStyle={{
                marginRight: 10,
                marginLeft: 3,
              }}
            />
          </View>
          <View>
            <Text>Password:</Text>
            <Input
              secureTextEntry={true}
              placeholder='6+ characters'
              onChangeText={(text) => this.setState({ password: text })}
              value={this.state.password}
              leftIcon={{ type: 'font-awesome', name: 'key' }}
              leftIconContainerStyle={{
                marginRight: 9,
                marginLeft: 0,
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
              onChangeText={(text) => this.setState({ email: text })}
              value={this.state.email}
              leftIcon={{ type: 'font-awesome', name: 'envelope' }}
              leftIconContainerStyle={{
                marginRight: 8,
                marginLeft: -2,
              }}
            />
          </View>
          <View>
            <Text>Phone: (optional)</Text>
            <Input
              name='phone'
              autoCompleteType='tel'
              placeholder='867-5309'
              onChangeText={(text) => this.setState({ phone: text })}
              value={this.state.phone}
              leftIcon={{ type: 'font-awesome', name: 'phone' }}
              leftIconContainerStyle={{
                marginRight: 10,
                marginLeft: 3,
              }}
            />
          </View>
          <View>
            <Text>
              What is your gender?{' '}
              <Text style={{ fontWeight: 'bold' }}>{this.state.gender}</Text>
            </Text>

            <View style={FilterStyle.genderBox}>
              <View
                style={[
                  FilterStyle.genderIconBoxLeft,
                  this.state.gender == 'male' && FilterStyle.genderIconChosen,
                ]}
              >
                <Icon
                  name='male-symbol'
                  type='foundation'
                  size={35}
                  onPress={() => this.setState({ gender: 'male' })}
                />
              </View>
              <View
                style={[
                  FilterStyle.genderIconBoxMiddle,
                  this.state.gender == 'female' && FilterStyle.genderIconChosen,
                ]}
              >
                <Icon
                  name='female-symbol'
                  type='foundation'
                  size={35}
                  iconStyle={FilterStyle.genderIcon}
                  onPress={() => this.setState({ gender: 'female' })}
                />
              </View>
              <View
                style={[
                  FilterStyle.genderIconBoxRight,
                  this.state.gender == 'non-binary' &&
                    FilterStyle.genderIconChosen,
                ]}
              >
                <Icon
                  name='genderless'
                  type='font-awesome'
                  size={35}
                  iconStyle={FilterStyle.genderIcon}
                  onPress={() => this.setState({ gender: 'non-binary' })}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={LoginCss.submitButton}>
          <Button title='Create' onPress={this.handleSubmit} />
        </View>

        <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 5 }}>
          {this.state.message}
        </Text>
        <View style={LoginCss.backToLoginButton}>
          <Button
            title='Go Back To Login'
            onPress={() => this.props.toggleModal(false)}
            color='#1d4f7c'
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = {
  loggedIn: (results) => loggedIn(results),
};

export default connect(null, mapDispatchToProps)(SignUp);

{
  /* <Picker
  selectedValue={this.state.gender}
  onValueChange={(gender) => this.setState({ gender })}
  placeholder='Choose your Gender'
>
  <Picker.Item label='Choose' disabled={true} enabled={false} />
  <Picker.Item label='male' value='male' />
  <Picker.Item label='female' value='female' />
  <Picker.Item label='nonbinary' value='nonbinary' />
</Picker>; */
}
