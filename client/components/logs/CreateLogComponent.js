import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Switch,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import {
  Card,
  Input,
  Rating,
  Icon,
  registerCustomIconType,
  Slider,
} from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { connect } from 'react-redux';
import { setCreatedToday } from '../../redux/ActionCreators';

import { Styles } from '../../styles/MainStyles';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { localSource } from '../../assets/localSource';

// import { registerCustomIconType } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
registerCustomIconType('font-awesome-5', FontAwesome5);

class CreateLog extends Component {
  state = {
    mood: null,
    moodEmoji: null,
    productivity: 3,
    productivityMsg: '',
    journal: '',
    privateJournal: this.props.userSettings.privateJournalDefault,
    hideCreator: this.props.userSettings.hideCreatorDefault,
    err: null,
    message: null,
    messageCss: 'red',
    day: null,
    year: null,
    submitted: false,
  };

  componentDidMount() {

    let today = new Date();
    var start = new Date(today.getFullYear(), 0, 0);
    var diff =
      today -
      start +
      (start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000;
    var oneDay = 1000 * 60 * 60 * 24;
    let a = today.toString().split(' ');
    var day = Math.floor(diff / oneDay);
    let year = Number(a[3]);

    this.setState({
      dayOfYear: day,
      year: year,
      dayOfWeek: a[0],
      dayOfMonth: Number(a[2]),
      month: a[1],
    });
  }

  async getLocationAsync() {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const { status, permissions } = await Permissions.askAsync(
      Permissions.LOCATION
    );

    if (status === 'granted') {
      return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    } else {
      throw new Error('Location permission not granted');
    }
  }

  handleChange = (text) => {
    if (text) {
      text = text.replace(/[\r\n\v]+/g, '');
    }
    this.setState({
      journal: text,
    });
  };

  submit = async () => {
    const { navigate } = this.props.navigation;

    if (!this.state.mood || !this.state.productivity) {
      let moodMsg = !this.state.mood && `You didn't select your mood`;
      let productivityMsg =
        !this.state.productivity && `You didn't select your productivity`;
      this.setState({
        moodMsg,
        productivityMsg,
      });
    } else if (this.props.userSettings.createdToday) {
      Alert.alert('Error', 'You have already created a log today!', [
        {
          text: 'OK',
          onPress: () => {
            navigate('See Logs', { info: { instructions: 'default' } });
          },
        },
      ]);
    } else {
      this.setState({
        productivityMsg: 'Your log is being submitted',
        submitted: true,
      });
      const info = this.state;
      info.location = await this.getLocationAsync();
      const response = await fetch(`${localSource}/logs/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': this.props.userSettings.token
        },
        body: JSON.stringify(info),
      });

      const set = await this.props.setCreatedToday();
      navigate('See All Logs', { info: { instructions: 'created' } });
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={Styles.createLogContainer}>
          <Text style={{ fontSize: 22, textAlign: 'center', margin: '5%' }}>
            CREATE A LOG
          </Text>

          <Text
            style={{ textAlign: 'center', fontSize: 17, marginVertical: '3%' }}
          >
            What were some of your thoughts about today?
          </Text>
          <View styles={{ width: '100%' }}>
            <Input
              onKeyPress={(value) => {
                value.nativeEvent.key == 'Enter' && Keyboard.dismiss();
              }}
              placeholder='max length 250 characters'
              onChangeText={(text) => {
                this.handleChange(text);
              }}
              value={this.state.journal}
              autoCapitalize='sentences'
              maxLength={250}
              multiline={true}
              numberOfLines={3}
              textAlignVertical='top'
              containerStyle={{
                borderWidth: 1,
                margin: 5,
                width: '97%',
              }}
            />
          </View>

          <Text
            style={{ textAlign: 'center', fontSize: 19, marginVertical: '3%' }}
          >
            What is your mood?
          </Text>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
          >
            <Icon
              color='#1776bf'
              raised
              reverse={this.state.mood == 1}
              type='font-awesome-5'
              name='sad-tear'
              size={30}
              onPress={() =>
                this.setState({
                  mood: 1,
                })
              }
            />
            <Icon
              color='#1776bf'
              raised
              reverse={this.state.mood == 2}
              type='font-awesome-5'
              name='frown'
              size={30}
              onPress={() =>
                this.setState({
                  mood: 2,
                })
              }
            />
            <Icon
              color='#1776bf'
              raised
              reverse={this.state.mood == 3}
              type='font-awesome-5'
              name='meh'
              size={30}
              onPress={() =>
                this.setState({
                  mood: 3,
                })
              }
            />
            <Icon
              color='#1776bf'
              raised
              reverse={this.state.mood == 4}
              type='font-awesome-5'
              name='smile'
              size={30}
              onPress={() =>
                this.setState({
                  mood: 4,
                })
              }
            />
            <Icon
              color='#1776bf'
              raised
              reverse={this.state.mood == 5}
              type='font-awesome-5'
              name='laugh'
              size={30}
              onPress={() =>
                this.setState({
                  mood: 5,
                })
              }
            />
          </View>

          <Text
            style={{ textAlign: 'center', fontSize: 18, marginVertical: '3%' }}
          >
            How productive do you think you were today?
          </Text>

          <Text style={{ textAlign: 'center', fontSize: 30 }}>
            {this.state.productivity}
          </Text>
          <View style={{ marginHorizontal: '20%' }}>
            <Slider
              value={this.state.productivity}
              onValueChange={(productivity) => this.setState({ productivity })}
              maximumValue={5}
              minimumValue={1}
              step={1}
              thumbTintColor='#9c9ce6'
            />
          </View>

          <View style={Styles.logSwitchOne}>
            <Text style={{ fontSize: 18 }}>Make this a private Log:</Text>
            <Switch
              value={this.state.privateJournal}
              onValueChange={(value) =>
                this.setState({ privateJournal: !this.state.privateJournal })
              }
            />
          </View>
          <View style={Styles.logSwitchTwo}>
            <Text style={{ fontSize: 18 }}>Hide your status as creator:</Text>
            <Switch
              value={this.state.hideCreator}
              onValueChange={(value) =>
                this.setState({ hideCreator: !this.state.hideCreator })
              }
            />
          </View>
          <View>
            <Button
              title='Submit'
              onPress={!this.state.submitted && this.submit}
            />
          </View>
          <Text style={{ textAlign: 'center', fontSize: 18 }}>
            {this.state.moodMsg}
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 18 }}>
            {this.state.productivityMsg}
          </Text>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userSettings: state.userSettings,
  };
};

//MAP DISPATCH NEEDED

const mapDispatchToProps = {
  setCreatedToday: () => setCreatedToday(),
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateLog);