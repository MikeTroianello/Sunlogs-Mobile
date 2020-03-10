import React, { Component, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { Input } from 'react-native-elements';

import { localSource } from '../../assets/localSource';

class Delete extends Component {
  deleteUser = () => {
    const { navigate } = this.props.navigation;
    const info = this.state;
    console.log('BALEETED', info);
    Alert.alert(
      'FINAL WARNING',
      'Are you absolutely sure you want to delete your account?',
      [
        { text: 'Yes', onPress: () => console.log('BALEETED') },
        { text: 'No', onPress: () => console.log('Not BALEETED') }
      ],
      { cancelable: false }
    );
    // fetch(`${localSource}/delete-user`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(info)
    // })
    //   .then(response => response.json())
    //   .then(results => {
    //     // this.props.logIt(results);
    //     console.log(results);
    //     this.props.deleteUser();
    //     navigate('Sign Up');
    //   })
    //   .catch(error => {
    //     this.setState({
    //       message: `Username already exists!`
    //     });
    //   });
  };

  render() {
    return (
      <View className='settings-delete'>
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
          onChangeText={text => this.handleChange(text, 'confirmation')}
        />

        <Button title='DELETE' onPress={this.deleteUser} />
      </View>
    );
  }
}

export default Delete;
