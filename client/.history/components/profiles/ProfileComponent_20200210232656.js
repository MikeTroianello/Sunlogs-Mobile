import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Styles } from '../../styles/MainStyles';

class Profile extends Component {
  render() {
    return (
      <View>
        <Text style={Styles.container}>THIS IS THE PROFILE PAGE</Text>
      </View>
    );
  }
}

export default Profile;
