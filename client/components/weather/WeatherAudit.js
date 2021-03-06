import React from 'react';
import { View, Text } from 'react-native';

import WeatherAvg from './WeatherAvg';

import { weatherboxCss } from '../../styles/MainStyles';

const WeatherAudit = props => {
  let clear = [];
  let clouds = [];
  let rain = [];
  let snow = [];
  let outlier = [];

  if (props.logs) {
    props.logs.map(log => {
      switch (log.weatherType) {
        case 'Clear':
          clear.push(log);
          break;
        case 'Clouds':
        case 'Mist':
          clouds.push(log);
          break;
        case 'Snow':
          snow.push(log);
          break;
        case 'Rain':
        case 'Drizzle':
        case 'Thunderstorm':
          rain.push(log);
          break;
        default:
          outlier.push(log);
          break;
      }
      return log;
    });
  }

  return (
    <View style={weatherboxCss.box}>
      <View style={weatherboxCss.header}>
        <Text>Weather</Text>
        <Text>Mood Average</Text>
        <Text className='header-productivity'>Productivity Average</Text>
      </View>
      <View className='weather-avg'>
        <WeatherAvg weather={'Clear'} logs={clear} />
        <WeatherAvg weather={'Clouds'} logs={clouds} />
        <WeatherAvg weather={'Rain'} logs={rain} />
        <WeatherAvg weather={'Snow'} logs={snow} />
      </View>
    </View>
  );
};

export default WeatherAudit;
