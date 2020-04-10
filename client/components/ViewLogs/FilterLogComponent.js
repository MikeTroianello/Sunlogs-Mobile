import React, { Component } from 'react';
import { Text, View, FlatList, Picker, ScrollView } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Log from './LogComponent';

import WeatherAudit from '../weather/WeatherAudit';
import StateFilter from '../filterByLocation/StateFilter';
import CountyFilter from '../filterByLocation/CountyFilter';

import { Styles, FilterStyle } from '../../styles/MainStyles';

import { ThemeProvider } from 'react-native-elements';

import { localSource } from '../../assets/localSource';

class FilterLog extends Component {
  state = {
    today: new Date(),
    date: new Date(),
    isoDate: null,
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
    setGender: '',
    chosenGender: null,
    instructions: '',
  };

  componentDidMount() {
    // console.log('COMPONENT HAS NOW MOUNTED');
    let { today } = this.state;
    // this.sanitizeDate(today);
  }

  sanitizeDate = (dateToLookFor, message) => {
    // console.log('SANITIZE DATE IS NOW GETTING CALLED???????');

    var start = new Date(dateToLookFor.getFullYear(), 0, 0);

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

  changeDate = (date) => {
    // // console.log('NOW CHANGINGGGGGGGGGGGGGGGGGGG');
    // if (date) {
    //   let standardDate = date;
    //   date = date.split('-');
    //   let b = date.pop();
    //   date.unshift(b);
    //   date = date.join('-');
    //   var isoDate = new Date(`${date}T12:00:00Z`);
    //   // console.log('DOES THIS WPPRK HERERERERERRERERER?????', isoDate);
    //   // this.sanitizeDate(isoDate);
    //   this.setState(
    //     {
    //       date: standardDate,
    //       isoDate: isoDate,
    //       instructions: 'change day',
    //     },
    // this.props.toggleModal();
    this.props.changeDate(date);
    // );
    // }
  };

  getLogsByDate = (day, year) => {
    // console.log('GETTING THE LOGS BY DATE', day, year);
    fetch(`${localSource}/logs/date/${year}/${day}`)
      .then((response) => response.json())
      .then((results) => {
        const states = results.specificDay.map((log) => {
          return log.state;
        });

        this.setState({
          logs: results.specificDay,
          filteredLogs: results.specificDay,
          filteredLogsCopy: results.specificDay,
          genderSearchMessage: null,
          yours: results.yours,
          id: results.id,
          states: [...new Set(states)],
          counties: [],
        });
      })
      .catch((error) => {
        // console.log(
        //   'There has been a problem with your fetch operation: ' + error.message
        // );
        throw error;
      });
  };

  filterByGender = (gender) => {
    // console.log(gender);
    let genderLogs = this.state.filteredLogsCopy.filter((log) => {
      return log.creatorId.gender === gender;
    });

    this.setState({
      filteredLogs: genderLogs,
      genderSearchMessage: `Showing all ${gender} logs`,
      setGender: gender,
    });
  };

  filterState = (value) => {
    if (value !== 'Filter by State:') {
      this.setState(
        {
          state: value,
        },
        () => {
          this.filterByState();
        }
      );
    }
  };

  filterByState = () => {
    console.log('\x1b[36m-FROM THE STORE-\x1b[0m', this.props.locations);
    let stateLogs = this.props.locations.logs.filter((log) => {
      return log.state === this.state.state;
    });

    let counties = new Set();

    stateLogs.map((log) => {
      return counties.add(log.county);
    });

    this.setState({
      filteredLogs: stateLogs,
      counties: [...counties],
      genderSearchMessage: null,
    });
  };

  filterCounty = (county) => {
    if (county !== 'Filter by County:') {
      this.setState({
        county: county,
      });
    }
  };

  // filterByCounty = () => {
  //   let countyLogs = this.state.logs.filter((log) => {
  //     return log.county === this.state.county;
  //   });
  //   this.setState(
  //     {
  //       filteredLogs: countyLogs,
  //       genderSearchMessage: null,
  //     },
  //     () => console.log('THE FILTERED COUNTY LOGS', this.state.filteredLogs)
  //   );
  // };

  weatherAudit = () => {
    return <WeatherAudit logs={this.state.filteredLogs} />;
  };

  buildList = () => {
    return (
      <FlatList
        data={this.state.filteredLogs}
        renderItem={this.renderLogs}
        keyExtractor={(item) => item._id.toString()}
      />
    );
  };

  renderLogs = ({ item }) => {
    // console.log('\x1b[93m-RENDERING THE LOGS-\x1b[39m', item);
    console.log('\x1b[36m%s\x1b[0m', this.props.locations);
    return (
      <View style={Styles.logs}>
        <Log
          log={item}
          passUpName={this.seeProfile}
          id={this.props.userSettings.id}
          privateAccount={item.creatorId.hideProfile}
        />
      </View>
    );
  };

  defaultLogs = () => {
    this.setState(
      {
        states: [],
        counties: [],
        state: undefined,
        stateFiltered: false,
        county: undefined,
        date: new Date(),
        instructions: 'default',
      },
      () => this.filter()
    );
  };

  filter = (instructions) => {
    const { navigate } = this.props.navigation;
    console.log('\x1b[36m-Everything we have:-\x1b[0m', this.state);
    if (instructions) {
      this.setState(
        {
          instructions: instructions,
        },
        () => navigate('View Logs', { info: this.state })
      );
    } else navigate('View Logs', { info: this.state });
  };

  render() {
    return (
      <View style={{ backgroundColor: '#e0e7ef', height: '100%' }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 25,
            borderBottomWidth: 1,
            width: '33%',
            marginLeft: '33%',
            marginRight: '33%',
            marginBottom: '5%',
          }}
        >
          Filter Logs
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderWidth: 1,
            padding: 5,
            marginTop: 3,
            marginBottom: 3,
            marginLeft: '9%',
            marginRight: '9%',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
            }}
          >
            Sort by Date:{'   '}
          </Text>

          <DatePicker
            date={this.props.date}
            format='MM-DD-YYYY'
            mode='date'
            placeholder='Select Date'
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            onDateChange={(date) => {
              this.props.changeDate(date);
            }}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
          />
        </View>

        <Text style={{ textAlign: 'center', fontSize: 20 }}>
          Filter by gender
        </Text>
        <View style={FilterStyle.genderBox}>
          <View
            style={[
              FilterStyle.genderIconBoxLeft,
              this.state.chosenGender == 'male' && FilterStyle.genderIconChosen,
            ]}
          >
            <Icon
              name='male-symbol'
              type='foundation'
              size={35}
              onPress={() => this.setState({ chosenGender: 'male' })}
            />
          </View>
          <View
            style={[
              FilterStyle.genderIconBoxMiddle,
              this.state.chosenGender == 'female' &&
                FilterStyle.genderIconChosen,
            ]}
          >
            <Icon
              name='female-symbol'
              type='foundation'
              size={35}
              iconStyle={FilterStyle.genderIcon}
              onPress={() => this.setState({ chosenGender: 'female' })}
            />
          </View>
          <View
            style={[
              FilterStyle.genderIconBoxRight,
              this.state.chosenGender == 'non-binary' &&
                FilterStyle.genderIconChosen,
            ]}
          >
            <Icon
              name='genderless'
              type='font-awesome'
              size={35}
              iconStyle={FilterStyle.genderIcon}
              onPress={() => this.setState({ chosenGender: 'non-binary' })}
            />
          </View>
        </View>

        <View style={FilterStyle.stateAndCountyBox}>
          <View>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>
              Filter By State:
            </Text>

            <StateFilter
              states={this.props.locations.states}
              filter={this.filterState}
              state={this.state.state}
            />
          </View>
          {/* <View style={{ borderWidth: 1 }}></View> */}
          <View>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>
              Filter By County:
            </Text>
            <CountyFilter
              counties={this.state.counties}
              filter={(county) => this.filterCounty(county)}
              county={this.state.county}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: '15%',
            marginBottom: '4%',
            marginHorizontal: '2%',
            position: 'absolute',
            bottom: '23%',
            width: '96%',
          }}
        >
          <Button
            title='Filter!'
            onPress={() => {
              this.props.filter(this.state);
              this.props.toggleModal();
            }}
            buttonStyle={{
              backgroundColor: '#4DA1DD',
            }}
          />
        </View>
        <View
          style={{
            marginHorizontal: '2%',
            position: 'absolute',
            bottom: '15%',
            width: '96%',
          }}
        >
          <Button
            title='Back to default'
            onPress={() => {
              this.props.defaultLogs();
              this.props.toggleModal();
            }}
            buttonStyle={{
              backgroundColor: '#45A7C2',
            }}
          />
        </View>
        <View
          style={{
            marginHorizontal: '2%',
            position: 'absolute',
            bottom: '5%',
            width: '96%',
          }}
        >
          <Button
            title='Close'
            onPress={this.props.toggleModal}
            buttonStyle={{
              backgroundColor: 'gray',
            }}
          />
        </View>
      </View>
    );
  }
}

//USE MAP STATE FOR CREATED TODAY ALERT

const mapStateToProps = (state) => {
  return {
    userSettings: state.userSettings,
    locations: state.locations,
  };
};

export default connect(mapStateToProps)(FilterLog);

// selectedValue={this.state.setGender}
// onValueChange={gender => this.filterByGender(gender)}
// placeholder='Choose your Gender'
