import React, { Component, Fragment } from 'react';
import { Text, View, FlatList, ScrollView } from 'react-native';
import { Styles } from '../../styles/MainStyles';
import { Icon, Button, Tile } from 'react-native-elements';

import WeatherAudit from '../weather/WeatherAudit';
import Log from '../ViewLogs/LogComponent';
import LoadingLogs from '../LoadingLogs';

import { profileStyle } from '../../styles/ProfileStyles';

import { localSource } from '../../assets/localSource';

class ViewOtherProfiles extends Component {
  state = {
    user: null,
    rawLogs: null,
    logs: null,
    moodAvg: [],
    mood: 0,
    name: null,
    oldestFirst: false,
  };

  componentDidMount() {
    this.setItAllUp();
  }

  setItAllUp = async () => {
    const { id } = this.props.route.params;
    fetch(`${localSource}/logs/all/${id}`)
      .then((response) => response.json())
      .then((results) => {
        const reducer = (accumulator, currentValue) =>
          accumulator + currentValue;
        let moodArr = [];

        results.map((log) => {
          moodArr.push(log.mood);
        });

        let mood =
          Math.round(100 * (moodArr.reduce(reducer) / moodArr.length)) / 100;

        this.setState({
          logs: results,
          mood: mood,
        });
      })
      .catch((error) => {
        console.log(
          'There has been a problem with your fetch operation: ' + error.message
        );
        throw error;
      });
  };

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
    this.setState((prevState) => ({
      oldestFirst: !prevState.oldestFirst,
      logs: sortedLogs,
    }));
  };

  renderLogs = ({ item }) => {
    return (
      <View style={Styles.logs}>
        <Log
          log={item}
          id={null}
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
        keyExtractor={(item) => item._id.toString()}
      />
    );
  };

  render() {
    const { profileName } = this.props.route.params;

    if (!this.state.logs) {
      return (
        <View
          style={{ backgroundColor: '#e0e7ef', width: '100%', height: '100%' }}
        >
          <Text style={{ textAlign: 'center', fontSize: 18, margin: 9 }}>
            This is {profileName}'s page
          </Text>
          <LoadingLogs />
        </View>
      );
    } else {
      return (
        <ScrollView style={{ backgroundColor: '#e0e7ef' }}>
          <Text style={{ textAlign: 'center', fontSize: 18, margin: 9 }}>
            This is {profileName}'s page
          </Text>
          <View className='profile-mood-box'>
            <Text style={{ textAlign: 'center', fontSize: 18, margin: 0 }}>
              {profileName}'s Overall Happiness: {this.state.mood}
            </Text>
            {/* <Icon name={this.state.gender} type={this.state.iconSource} /> */}
            {this.state.logs && <WeatherAudit logs={this.state.logs} />}
          </View>
          <View style={profileStyle.sortButton}>
            <Button
              title={`Show ${
                this.state.oldestFirst ? 'oldest' : 'newest'
              } first`}
              onPress={this.sortByAge}
              buttonStyle={{
                backgroundColor: '#5694DB',
                width: '100%',
                borderWidth: 1,
                borderColor: '#413F41',
              }}
            />
          </View>

          {this.state.logs && this.buildList()}
        </ScrollView>
      );
    }
  }
}

export default ViewOtherProfiles;
