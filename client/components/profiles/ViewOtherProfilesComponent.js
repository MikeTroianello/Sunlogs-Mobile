import React, { Component } from 'react';
import { Text, View, FlatList, Button, ScrollView } from 'react-native';
import { Styles } from '../../styles/MainStyles';
import { Icon } from 'react-native-elements';

import DatePicker from 'react-native-datepicker';

import WeatherAudit from '../weather/WeatherAudit';

import mockLogs from '../../mockLogs/mockLogs.json';

class ViewOtherProfiles extends Component {
  state = {
    user: null,
    rawLogs: null,
    logs: null,
    moodAvg: [],
    mood: 0,
    name: null,
    oldestFirst: false
  };

  // componentDidMount() {
  //   this.service
  //     .seeUser(this.props.match.params.id)
  //     .then(results => {
  //       this.makeTheLogs(results);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  componentDidMount() {
    console.log('INSIDE VIEW OTHER PROFILES, COMPONENT IS MOUNTING');
    this.setItAllUp();
  }

  setItAllUp = async () => {
    // let { profileSelf } = this.props;

    // let results;

    // profileSelf
    //   ? (results = await this.service.profile())
    //   : (results = await this.service.seeUser(this.props.match.params.id));

    let profileSelf = false;
    let results = mockLogs;
    console.log('RESULTS', results);
    this.makeTheLogs(results, profileSelf);
  };

  makeTheLogs = results => {
    if (!results || results.length < 1) {
      this.setState({
        logs: <View>They haven't created any logs...</View>
      });
    } else {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      let moodArr = [];
      let name;
      let genderIcon;
      let iconSource = 'foundation';

      let theLogs = results.map((log, key) => {
        console.log('LOG', log.year);
        switch (log.creatorId.gender) {
          case 'male':
            genderIcon = 'male-symbol';
            break;
          case 'female':
            genderIcon = 'female-symbol';
            break;
          default:
            genderIcon = 'genderless';
            iconSource = 'font-awesome';
            break;
        }

        let weatherString;
        if (!name) name = log.creatorId.username;
        moodArr.push(log.mood);
        if (log.weatherIcon) {
          weatherString = `http://openweathermap.org/img/wn/${log.weatherIcon.slice(
            0,
            -1
          )}d@2x.png`;
        } else weatherString = '';

        return (
          <View key={key} className='log'>
            <View className='profile-log-head'>
              <View>
                <Text>
                  {log.month} {log.dayOfMonth}, {log.year}
                </Text>
                <Text>
                  {log.county}, {log.state}
                </Text>
              </View>
              <View className='weather-box weather-box-profile'>
                {/* <img
                    className='weather-icon'
                    src={weatherString}
                    alt={log.weatherType}
                  /> */}

                <Text> {log.weatherType}</Text>
              </View>
            </View>

            <View className='mood-and-productivity'>
              <Text>
                Mood: <Text>{log.mood}</Text>
              </Text>
              <Text>
                Productivity: <Text>{log.productivity}</Text>
              </Text>
            </View>
            <Text>Log: {log.journal}</Text>
          </View>
        );
      });
      let mood =
        Math.round(100 * (moodArr.reduce(reducer) / moodArr.length)) / 100;

      this.setState({
        rawLogs: results,
        logs: theLogs,
        mood: mood,
        name: name,
        gender: genderIcon,
        iconSource
      });
    }
  };

  sortByAge = () => {
    let sortedLogs;
    if (this.state.oldestFirst) {
      sortedLogs = this.state.rawLogs.sort((a, b) =>
        a.year > b.year ? 1 : -1
      );
      sortedLogs = this.state.rawLogs.sort((a, b) =>
        a.dayOfYear > b.dayOfYear ? 1 : -1
      );
    } else {
      sortedLogs = this.state.rawLogs.sort((a, b) =>
        a.year < b.year ? 1 : -1
      );
      sortedLogs = this.state.rawLogs.sort((a, b) =>
        a.dayOfYear < b.dayOfYear ? 1 : -1
      );
    }
    this.setState(
      prevState => ({
        oldestFirst: !prevState.oldestFirst
      }),
      this.makeTheLogs(sortedLogs)
    );
  };

  sortByAge = () => {
    this.setState(prevProps => ({
      oldestFirst: !prevProps.oldestFirst
    }));
  };

  render() {
    console.log('rendering', this.props.route.params.profileName);
    const { profileName } = this.props.route.params;

    return (
      <View className='top-push'>
        <Text>This is {profileName}'s page</Text>
        <View className='profile-mood-box'>
          <Text className='view-profile-overall-happiness'>
            {profileName}'s Overall Happiness: {this.state.mood}
          </Text>
          <Icon name={this.state.gender} type={this.state.iconSource} />
          {this.state.logs && <WeatherAudit logs={this.state.rawLogs} />}
        </View>
        <Button
          title={`Show ${this.state.oldestFirst ? 'oldest' : 'newest'} first`}
          onClick={this.sortByAge}
        />

        <View className='log-box'>{this.state.logs}</View>
      </View>
    );
  }
}

export default ViewOtherProfiles;
