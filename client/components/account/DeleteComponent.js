import React, { Component, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';

import { localSource } from '../../assets/localSource';

class Delete extends Component {
  state = {
    confirmation: '',
    message: '',
  };

  deleteUser = () => {
    if (this.state.confirmation !== this.props.userSettings.username) {
      this.setState({
        message: 'You did not enter your username properly!',
      });
    } else {
      Alert.alert(
        'FINAL WARNING',
        'Are you absolutely sure you want to delete your account?',
        [
          { text: 'Yes', onPress: () => this.confirmDeleteUser() },
          { text: 'No', onPress: () => console.log('Not BALEETED') },
        ],
        { cancelable: false }
      );
    }
  };

  confirmDeleteUser = () => {
    const { navigate } = this.props.navigation;
    const info = this.state.confimation;
    fetch(`${localSource}/delete-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    })
      .then((response) => response.json())
      .then((results) => {
        this.props.deleteUser();
        navigate('Sign Up');
      })
      .catch((error) => {
        this.setState({
          message: `Username already exists!`,
        });
      });
  };

  render() {
    return (
      <View
        style={{
          paddingTop:
            Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
        }}
      >
        <Text>Delete Profile</Text>
        <Text>
          <Text className='red'>WARNING:</Text> If you delete your profile, this
          cannot be undone!
        </Text>
        <Text className='settings-delete-warning'>
          <Text>
            Note: if you delete your account, your logs will stay intact, for
            mood aggregation purposes. All of your journals will be erased, as
            will the names of the logs.{' '}
          </Text>
        </Text>
        <Text>
          <Text>Type in your Usename Before Deletion</Text>
        </Text>
        <Input
          className='confirmDelete'
          name='confirmDelete'
          autoComplete='off'
          placeholder='make sure this is what you want...'
          style={{ fontSize: '1em', width: '250px' }}
          onChangeText={(text) => this.setState({ confirmation: text })}
        />

        <Button title='DELETE' onPress={this.deleteUser} />
        <Text>{this.state.message}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  userSettings: state.userSettings,
});

const mapDispatchToProps = {
  deleteUser: () => deleteUser(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Delete);
