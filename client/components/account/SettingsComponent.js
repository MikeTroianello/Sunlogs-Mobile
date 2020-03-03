import React, { Component } from 'react';
import { Text, View, Switch, ScrollView, Button } from 'react-native';
import { Input } from 'react-native-elements';
import { Styles } from '../../styles/MainStyles';

import { localSource } from '../../assets/localSource';

class Settings extends Component {
  state = {
    message: null,
    hideProfile: false,
    privateJournalDefault: false,
    hideCreatorDefault: false,
    oldPhone: null,
    phone: null,
    oldEmail: null,
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
        // this.props.logIt(results);
        console.log(results);
      })
      .catch(error => {
        this.setState({
          message: `Something went wrong`
        });
      });
  };

  deleteUser = () => {
    const { navigate } = this.props.navigation;
    const info = this.state;
    console.log('BALEETED', info);
    fetch(`${localSource}/delete-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
      .then(response => response.json())
      .then(results => {
        // this.props.logIt(results);
        console.log(results);
        navigate('Sign Up');
      })
      .catch(error => {
        this.setState({
          message: `Username already exists!`
        });
      });
  };

  render() {
    return (
      <ScrollView alwaysBounceVertical={true}>
        <View className='settings'>
          <Text>Your Settings</Text>
          <Text>
            Note: pressing any of the save Switchs will update all fields you
            have changed. They are placed in each section for convenience
          </Text>
          <View className='settings-change-preferences'>
            <Text>Preferences</Text>
            <View>
              <Text>Hide your profile</Text>
              <Text>
                This makes sure people will not be able to view your profile.
              </Text>
              <Text className='settings-aside'>
                (They still can see your name on your logs, if you choose to not
                hide them)
              </Text>
              <Text>{this.state.hideProfile}</Text>
              <Text className={this.state.hideProfile ? 'red' : 'green'}>
                You currently{' '}
                {this.state.hideProfile === true && <Text>DO NOT </Text>}
                allow others to view your profile
              </Text>
              <Switch
                value={this.state.hideProfile}
                name='hideProfile'
                onValueChange={() => this.toggle('hideProfile')}
              />
            </View>
            <View>
              <Text>Make Journals Private by Default</Text>
              <Text
                className={this.state.privateJournalDefault ? 'red' : 'green'}
              >
                Your Journals are{' '}
                {this.state.privateJournalDefault ? 'HIDDEN' : 'shown'} by
                default
              </Text>
              <Switch
                value={this.state.privateJournalDefault}
                name='privateJournalDefault'
                onValueChange={() => this.toggle('privateJournalDefault')}
              />
            </View>
            <View>
              <Text>Hide your name by Default</Text>
              <Text>
                Your Journals are{' '}
                {this.state.hideCreatorDefault ? 'HIDDEN' : 'shown'} by default
              </Text>
              <Switch
                value={this.state.hideCreatorDefault}
                name='hideCreatorDefault'
                onValueChange={() => this.toggle('hideCreatorDefault')}
              />
            </View>
          </View>
          <View className='settings-change-info'>
            <Text>Change your Account Info</Text>
            <View>
              <Text>Your old phone number: {this.state.oldPhone}</Text>
              <View className='change-account-sub-box'>
                <Text>Change Phone # </Text>
                <Input
                  type='tel'
                  autoComplete='off'
                  pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                  name='phone'
                  placeholder='+3(141)592-6535'
                  onChangeText={text => this.handleChange(text, 'phone')}
                />
              </View>
            </View>
            <View>
              <Text>Your old email: {this.state.oldEmail}</Text>
              <View className='change-account-sub-box'>
                <Text>Change email</Text>
                <Input
                  type='email'
                  name='email'
                  autoComplete='off'
                  placeholder='name@email.com'
                  onChangeText={text => this.handleChange(text, 'email')}
                />
              </View>
            </View>

            <View className='settings-change-password'>
              <Text>Change Password</Text>
              <View className='change-password-super-box'>
                <View className='change-password-box'>
                  <View className='change-password-sub-box'>
                    <Text>New Password</Text>
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
          <View className='settings-delete'>
            <Text>Delete Profile</Text>
            <Text>
              <Text className='red'>WARNING:</Text> If you delete your profile,
              this cannot be undone!
            </Text>
            <Text className='settings-delete-warning'>
              <Text>
                Note: if you delete your account, your logs will stay intact,
                for mood aggregation purposes. All of your journals will be
                erased, as will the names of the logs.{' '}
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
        </View>
      </ScrollView>
    );
  }
}

export default Settings;
