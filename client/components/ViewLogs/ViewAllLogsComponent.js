import React, { Component } from 'react';
import { Text, View, FlatList, Button, Picker } from 'react-native';
import DatePicker from 'react-native-datepicker';

import Log from './LogComponent';

import WeatherAudit from '../weather/WeatherAudit';

import { Styles } from '../../styles/MainStyles';

import mockLog from '../../mockLogs/mockLog.json';
import mockLogs from '../../mockLogs/mockLogs.json';

class ViewAllLogs extends Component {
  state = {
    today: new Date(),
    date: new Date(),
    logs: null,
    filteredLogs: null,
    filteredLogsCopy: null,
    genderSearchMessage: null,
    yours: false,
    id: null,
    day: null,
    year: null,
    states: [],
    counties: [],
    state: undefined,
    stateFiltered: false,
    county: undefined,
    setGender: ''
  };

  filterByGender = gender => {
    console.log(gender);
    // let genderLogs = this.state.filteredLogsCopy.filter(log => {
    //   return log.creatorId.gender === gender;
    // });
    this.setState({
      // filteredLogs: genderLogs,
      genderSearchMessage: `Showing all ${gender} logs`,
      setGender: gender
    });
  };

  render() {
    const renderLogs = ({ item }) => {
      return (
        <View style={Styles.logs}>
          <Log log={item} />
        </View>
      );
    };
    return (
      <View>
        <Text>SEE ALL SUNLOGS HERE</Text>
        <WeatherAudit logs={mockLogs} />
        <Text htmlFor='gender'>Filter by gender</Text>

        <View>
          <Text>Sort by Date</Text>
          <DatePicker
            date={this.state.date}
            format='YYYY-MM-DD'
            mode='date'
            placeholder='Select Date'
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={date => {
              this.setState({ date: date });
            }}
          />
        </View>

        <Picker
          selectedValue={this.state.setGender}
          onValueChange={gender => this.filterByGender(gender)}
          placeholder='Choose your Gender'
        >
          <Picker.Item label='Choose' disabled={true} enabled={false} />
          <Picker.Item label='male' value='male' />
          <Picker.Item label='female' value='female' />
          <Picker.Item label='nonbinary' value='nonbinary' />
        </Picker>
        <FlatList
          data={mockLogs}
          renderItem={renderLogs}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}

export default ViewAllLogs;
