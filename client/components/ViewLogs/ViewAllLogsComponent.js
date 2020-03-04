import React, { Component } from 'react';
import { Text, View, FlatList, Button, Picker, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';

import Log from './LogComponent';

import WeatherAudit from '../weather/WeatherAudit';
import StateFilter from '../filterByLocation/StateFilter';
import CountyFilter from '../filterByLocation/CountyFilter';

import { Styles } from '../../styles/MainStyles';

import mockLog from '../../mockLogs/mockLog.json';
import mockLogs from '../../mockLogs/mockLogs.json';
import { ThemeProvider } from 'react-native-elements';

import { localSource } from '../../assets/localSource';

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

  componentDidMount() {
    let { today } = this.state;
    this.sanitizeDate(today);
  }

  sanitizeDate = (dateToLookFor, message) => {
    console.log('DATE TO LOOK FOR:', dateToLookFor.getFullYear());
    console.log('DATE TO LOOK FOR:', dateToLookFor);
    var start = new Date(dateToLookFor.getFullYear(), 0, 0);
    console.log('START', start);
    var diff =
      dateToLookFor -
      start +
      (start.getTimezoneOffset() - dateToLookFor.getTimezoneOffset()) *
        60 *
        1000;
    var oneDay = 1000 * 60 * 60 * 24;

    var day = Math.floor(diff / oneDay);
    let a = dateToLookFor.toString().split(' ');
    let year = a[3];

    this.getLogsByDate(day, year);
  };

  changeDate = date => {
    if (date) {
      this.setState({
        date: date
      });
      date = date.split('-');
      let b = date.pop();
      date.unshift(b);
      date = date.join('-');
      console.log('THIS IS THE DATE', date);
      var isoDate = new Date(`${date}T12:00:00Z`);
      this.sanitizeDate(isoDate);
    }
  };

  getLogsByDate = (day, year) => {
    fetch(`${localSource}/logs/date/${year}/${day}`)
      .then(response => response.json())
      .then(results => {
        console.log('SUCCESS', results.specificDay);
        const states = results.specificDay.map(log => {
          return log.state;
        });
        this.setState(
          {
            logs: results.specificDay,
            filteredLogs: results.specificDay,
            filteredLogsCopy: results.specificDay,
            genderSearchMessage: null,
            yours: results.yours,
            id: results.id,
            states: [...new Set(states)],
            counties: []
          },
          () => console.log(this.state)
        );
      })
      .catch(error => {
        console.log(
          'There has been a problem with your fetch operation: ' + error.message
        );
        throw error;
      });
  };

  filterByGender = gender => {
    console.log(gender);
    let genderLogs = this.state.filteredLogsCopy.filter(log => {
      return log.creatorId.gender === gender;
    });

    this.setState({
      filteredLogs: genderLogs,
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

  filterCounty = county => {
    if (county !== 'Filter by County:') {
      this.setState(
        {
          county: county
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
    console.log('THESE ARE THE COUNTy LOGS', countyLogs);
    this.setState(
      {
        filteredLogs: countyLogs,
        genderSearchMessage: null
      },
      () => console.log('THE FILTERED COUNTY LOGS', this.state.filteredLogs)
    );
  };

  defaultLogs = () => {
    this.setState({
      states: [],
      counties: [],
      state: undefined,
      stateFiltered: false,
      county: undefined,
      date: new Date()
    });
    this.sanitizeDate(this.state.today);
  };

  seeProfile = passedUpProps => {
    const { navigate } = this.props.navigation;
    const { username, _id } = passedUpProps;
    navigate('View Other Profiles', { profileName: username, id: _id });
  };

  weatherAudit = () => {
    return <WeatherAudit logs={this.state.filteredLogs} />;
  };

  buildList = () => {
    console.log('BUILD LIST HAS BEEN CALLED', this.state.filteredLogs);
    return (
      <FlatList
        data={this.state.filteredLogs}
        renderItem={this.renderLogs}
        keyExtractor={item => item._id.toString()}
      />
    );
  };

  renderLogs = ({ item }) => {
    return (
      <View style={Styles.logs}>
        <Log log={item} passUpName={this.seeProfile} />
      </View>
    );
  };

  render() {
    return (
      <ScrollView>
        {this.state.filteredLogs && this.weatherAudit()}

        <View>
          <Text>Sort by Date</Text>
          <DatePicker
            date={this.state.date}
            format='MM-DD-YYYY'
            mode='date'
            placeholder='Select Date'
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            onDateChange={date => {
              this.changeDate(date);
            }}
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
          />
        </View>

        <Text htmlFor='gender'>Filter by gender</Text>
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

        <StateFilter
          states={this.state.states}
          filter={this.filterState}
          state={this.state.state}
        />

        <Text>Filter By County:</Text>
        <CountyFilter
          counties={this.state.counties}
          filter={county => this.filterCounty(county)}
          county={this.state.county}
        />

        {this.state.filteredLogs && this.buildList()}
        <Button title='Back to default' onPress={this.defaultLogs} />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.username
  };
};

export default connect(mapStateToProps)(ViewAllLogs);
