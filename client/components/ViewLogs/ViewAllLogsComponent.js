import React, { Component } from 'react';
import { Text, View, FlatList, Button, Picker } from 'react-native';
import DatePicker from 'react-native-datepicker';

import Log from './LogComponent';

import WeatherAudit from '../weather/WeatherAudit';
import StateFilter from '../filterByLocation/StateFilter';
import CountyFilter from '../filterByLocation/CountyFilter';

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

  filterState = value => {
    if (value !== 'Filter by State:') {
      this.setState(
        {
          state: value
        },
        () => {
          this.filterByState();
        }
      );
    }
  };

  filterByState = () => {
    let stateLogs = this.state.logs.filter(log => {
      return log.state === this.state.state;
    });

    let counties = new Set();

    stateLogs.map(log => {
      return counties.add(log.county);
    });

    this.setState({
      filteredLogs: stateLogs,
      counties: [...counties],
      genderSearchMessage: null
    });
  };

  filterCounty = e => {
    if (e.target.value !== 'Filter by County:') {
      this.setState(
        {
          [e.target.name]: e.target.value
        },
        () => {
          this.filterByCounty();
        }
      );
    }
  };

  filterByCounty = () => {
    let countyLogs = this.state.logs.filter(log => {
      return log.county === this.state.county;
    });

    this.setState({
      filteredLogs: countyLogs,
      genderSearchMessage: null
    });
  };

  defaultLogs = () => {
    this.setState({
      states: [],
      counties: [],
      state: undefined,
      stateFiltered: false,
      county: undefined
    });
    this.sanitizeDate(this.state.today);
  };

  seeProfile = name => {
    const { navigate } = this.props.navigation;
    // navigate('Test');
    navigate('View Other Profiles', { profileName: name });
  };

  render() {
    let allStates = mockLogs.map(log => {
      return log.state;
    });

    let states = [...new Set(allStates)];

    const renderLogs = ({ item }) => {
      return (
        <View style={Styles.logs}>
          <Log log={item} passUpName={this.seeProfile} />
        </View>
      );
    };
    return (
      <View>
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

        <Text>Filter By State:</Text>

        <StateFilter states={states} filter={this.filterState} />

        <Text>Filter By County:</Text>
        <CountyFilter
          counties={this.state.counties}
          filter={this.filterCounty}
        />

        <FlatList
          data={mockLogs}
          renderItem={renderLogs}
          keyExtractor={item => item.id.toString()}
        />
        <Button title='Back to default' onPress={this.defaultLogs} />
      </View>
    );
  }
}

export default ViewAllLogs;
