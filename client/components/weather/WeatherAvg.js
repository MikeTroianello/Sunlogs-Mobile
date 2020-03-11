import React from 'react';
import { View, Text } from 'react-native';

import { weatherboxCss } from '../../styles/MainStyles';

const WeatherAvg = props => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  let mood = [];
  let productivity = [];
  if (props.logs.length > 0) {
    props.logs.forEach(log => {
      mood.push(log.mood);
      productivity.push(log.productivity);
    });
    mood = Math.round(100 * (mood.reduce(reducer) / props.logs.length)) / 100;
    productivity =
      Math.round(100 * (productivity.reduce(reducer) / props.logs.length)) /
      100;
  } else {
    mood = 0;
    productivity = 0;
  }

  return (
    <View>
      <View style={weatherboxCss.subHeader}>
        <Text style={weatherboxCss.subHeaderThird}>{props.weather}:</Text>
        <Text style={weatherboxCss.subHeaderThird}>{mood}</Text>
        <Text style={weatherboxCss.subHeaderThird}>{productivity}</Text>
      </View>
    </View>
  );
};

export default WeatherAvg;
