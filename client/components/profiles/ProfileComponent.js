import React, { Component } from 'react';
import { Text, View, FlatList, Button, ScrollView } from 'react-native';
import { Styles } from '../../styles/MainStyles';

import WeatherAudit from '../weather/WeatherAudit';
import Log from '../ViewLogs/LogComponent';

import { localSource } from '../../assets/localSource';

import { connect } from 'react-redux';

class Profile extends Component {
  state = {
    user: null,
    rawLogs: null,
    logs: null,
    moodAvg: [],
    mood: null,
    notToday: false,
    block: false,
    oldestFirst: false,
    profileHeader: '',
    happinessHeader: ''
  };

  componentDidMount = () => {
    this.setItAllUp();
  };

  setItAllUp = async () => {
    fetch(`${localSource}/logs/all/my-posts`)
      .then(response => response.json())
      .then(results => {
        this.setState({
          logs: results
        });
      })
      .catch(error => {
        this.setState({
          message: `Username already exists!`
        });
      });
  };

  // makeTheLogs = (results, profileSelf) => {
  //   let today = new Date();
  //   var start = new Date(today.getFullYear(), 0, 0);
  //   var diff =
  //     today -
  //     start +
  //     (start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000;
  //   var oneDay = 1000 * 60 * 60 * 24;
  //   let a = today.toString().split(' ');
  //   var day = Math.floor(diff / oneDay);
  //   let year = a[3];

  //   const reducer = (accumulator, currentValue) => accumulator + currentValue;
  //   let moodArr = [];

  //   let name;

  //   moodArr.push(log.mood);
  //   let weatherString;

  //   weatherString = `http://openweathermap.org/img/wn/${log.weatherIcon.slice(
  //     0,
  //     -1
  //   )}d@2x.png`;
  // };

  sortByAge = () => {
    let sortedLogs;
    if (this.state.oldestFirst) {
      sortedLogs = this.state.logs.sort((a, b) => (a.year > b.year ? 1 : -1));
      sortedLogs = this.state.logs.sort((a, b) =>
        a.dayOfYear > b.dayOfYear ? 1 : -1
      );
    } else {
      sortedLogs = this.state.logs.sort((a, b) => (a.year < b.year ? 1 : -1));
      sortedLogs = this.state.logs.sort((a, b) =>
        a.dayOfYear < b.dayOfYear ? 1 : -1
      );
    }
    this.setState(prevProps => ({
      oldestFirst: !prevProps.oldestFirst,
      logs: sortedLogs
    }));
  };

  renderLogs = ({ item }) => {
    // console.log('\x1b[93m-RENDERING THE LOGS-\x1b[39m', item);
    return (
      <View style={Styles.logs}>
        <Log
          log={item}
          id={this.props.userSettings.id}
          privateAccount={item.creatorId.hideProfile}
          profile={true}
        />
      </View>
    );
  };

  buildList = () => {
    return (
      <FlatList
        data={this.state.logs}
        renderItem={this.renderLogs}
        keyExtractor={item => item._id.toString()}
      />
    );
  };

  create = () => {
    const { navigate } = this.props.navigation;
    navigate('Create Log');
  };

  render() {
    // console.log('\x1b[93m-Errything-\x1b[39m', this.state);
    return (
      <ScrollView>
        <View className='top-push'>
          {!this.props.userSettings.createdToday && (
            <Text>
              You have not created a mood log today.{' '}
              <Text onPress={this.create} style={{ color: 'blue' }}>
                Create one now!
              </Text>
            </Text>
          )}
          <View className='profile-mood-box'>
            <Text style={{ textAlign: 'center', fontSize: 18 }}>
              Your Overall Happiness: {this.state.mood}
            </Text>
          </View>
          {this.state.logs && !this.state.block && (
            <WeatherAudit logs={this.state.logs} />
          )}

          <View>
            <Button
              onPress={this.sortByAge}
              title={`Show ${
                this.state.oldestFirst ? 'oldest' : 'newest'
              } first`}
            />
          </View>
          {this.state.logs && this.buildList()}
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

export default connect(mapStateToProps)(Profile);
