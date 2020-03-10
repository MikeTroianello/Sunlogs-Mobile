import React, { Component } from 'react';
import {
  Text,
  View,
  Switch,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Input } from 'react-native-elements';
import { Styles, SettingsCss } from '../../styles/MainStyles';
import { connect } from 'react-redux';

import { updateSettings, deleteUser } from '../../redux/ActionCreators';

import { localSource } from '../../assets/localSource';

class Settings extends Component {
  state = {
    message: null,
    hideProfile: this.props.userSettings.hideProfile,
    privateJournalDefault: this.props.userSettings.privateJournalDefault,
    hideCreatorDefault: this.props.userSettings.hideCreatorDefault,
    oldPhone: this.props.userSettings.phone,
    phone: null,
    oldEmail: this.props.userSettings.email,
    email: null,
    oldPass: null,
    newPass: null,
    confirmation: null,
    deletePassword: null,
    id: null
  };

  handleChange = (text, statePiece) => {
    this.setState(
      {
        [statePiece]: text
      },
      () => console.log('THIS IS THE NEW STATE', this.state)
    );
  };

  toggle = statePiece => {
    this.setState(
      prevState => ({
        [statePiece]: !prevState[statePiece]
      }),
      () => console.log('SWITCH', statePiece, this.state)
    );
  };

  changeInfo = () => {
    const info = this.state;

    console.log('SETTINGS CHANGing:', info);
    fetch(`${localSource}/change-info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
      .then(response => response.json())
      .then(results => {
        console.log(results);
        this.props.updateSettings(info);
        Alert.alert(
          '',
          'Settings changed!',
          [
            {
              text: 'OK',
              onPress: () => this.props.navigation.navigate('See Logs')
            }
          ],
          { cancelable: false }
        );
      })
      .catch(error => {
        this.setState({
          message: `Something went wrong`
        });
      });
  };

  deleteUser = () => {
    const { navigate } = this.props.navigation;
    navigate('Delete Profile');
  };

  render() {
    console.log(
      'WHAT COMES BACK FROM THE REDUX STORE: ',
      this.props.userSettings
    );
    return (
      <ScrollView alwaysBounceVertical={true}>
        <View className='settings'>
          <View className='settings-change-preferences'>
            <View style={SettingsCss.preferences}>
              <View>
                <Text>Hide your profile</Text>
                {/* <Text>
                  {this.state.hideProfile
                    ? 'Your profile is Hidden'
                    : 'Your profile is Viewable'}
                </Text> */}
                <Text className={this.state.hideProfile ? 'red' : 'green'}>
                  You {this.state.hideProfile === true && <Text>DO NOT </Text>}
                  allow others to view your profile
                </Text>
              </View>
              {/* <Text>
                This makes sure people will not be able to view your profile.
              </Text>
              <Text className='settings-aside'>
                (They still can see your name on your logs, if you choose to not
                hide them)
              </Text>
              <Text className={this.state.hideProfile ? 'red' : 'green'}>
                You currently{' '}
                {this.state.hideProfile === true && <Text>DO NOT </Text>}
                allow others to view your profile
              </Text> */}

              <Switch
                value={this.state.hideProfile}
                name='hideProfile'
                onValueChange={() => this.toggle('hideProfile')}
              />
            </View>
            <View style={SettingsCss.preferences}>
              <View>
                <Text>Make Journals Private by Default</Text>
                <Text
                  className={this.state.privateJournalDefault ? 'red' : 'green'}
                >
                  Your Journals are{' '}
                  {this.state.privateJournalDefault ? 'HIDDEN' : 'shown'} by
                  default
                </Text>
              </View>
              <Switch
                value={this.state.privateJournalDefault}
                name='privateJournalDefault'
                onValueChange={() => this.toggle('privateJournalDefault')}
              />
            </View>
            <View style={SettingsCss.preferences}>
              <View>
                <Text>Hide your name by Default</Text>
                <Text>
                  Your name is{' '}
                  {this.state.hideCreatorDefault ? 'HIDDEN' : 'shown'} by
                  default
                </Text>
              </View>
              <Switch
                value={this.state.hideCreatorDefault}
                name='hideCreatorDefault'
                onValueChange={() => this.toggle('hideCreatorDefault')}
              />
            </View>
          </View>
          <View className='settings-change-info'>
            <View className='change-account-sub-box'>
              <Text>Change Phone # </Text>
              <Input
                type='tel'
                autoComplete='off'
                pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                name='phone'
                placeholder={this.state.oldPhone || '+3(141)592-6535'}
                onChangeText={text => this.handleChange(text, 'phone')}
              />
            </View>

            <View className='change-account-sub-box'>
              <Text>Change email</Text>
              <Input
                type='email'
                name='email'
                autoComplete='off'
                placeholder={this.state.oldEmail || 'name@email.com'}
                onChangeText={text => this.handleChange(text, 'email')}
              />
            </View>

            <View className='settings-change-password'>
              <View className='change-password-super-box'>
                <View className='change-password-box'>
                  <View className='change-password-sub-box'>
                    <Text>Change Password</Text>
                    <Input
                      type='password'
                      name='oldPass'
                      autoComplete='off'
                      placeholder='********'
                      onChangeText={text => this.handleChange(text, 'oldPass')}
                    />
                  </View>

                  <View className='change-password-sub-box'>
                    <Text>Confirm Password</Text>
                    <Input
                      type='password'
                      name='newPass'
                      autoComplete='off'
                      placeholder='********'
                      onChangeText={text => this.handleChange(text, 'newPass')}
                    />
                  </View>
                </View>
              </View>
            </View>

            <Button title='Change Settings' onPress={this.changeInfo} />
          </View>

          {/* <Button title='DELETE' onPress={this.deleteUser} /> */}
          <TouchableOpacity
            onPress={this.deleteUser}
            style={SettingsCss.deleteTouchableOpacity}
          >
            <Text>DELETE USER</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    userSettings: state.userSettings
  };
};

const mapDispatchToProps = {
  updateSettings: info => updateSettings(info),
  deleteUser: () => deleteUser()
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
