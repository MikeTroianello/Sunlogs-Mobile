import React from 'react';
import { View, Text } from 'react-native';
import { logCss } from '../../styles/LogStyles';

const LogBody = props => {
  let countyString = '';
  if (!props.hideCounty) {
    countyString = `${props.county} County, ${props.state}`;
  }

  if (!props.journal) props.journal = '';
  let journal = props.journal || '';

  return (
    <View>
      <Text style={logCss.place}>{countyString}</Text>
      {/* <Text>
        {props.county} County, {props.state}
      </Text> */}
      <View style={logCss.moodBox}>
        <View style={logCss.moodSubBox}>
          <Text style={logCss.moodHeader}>Mood:</Text>
          <Text style={logCss.moodNum}>{props.mood}</Text>
        </View>
        <View style={logCss.moodSubBox}>
          <Text style={logCss.moodHeader}>Productivity:</Text>
          <Text style={logCss.moodNum}>{props.productivity}</Text>
        </View>
      </View>
      <Text style={logCss.log}>Log: {props.journal}</Text>
      {props.journal !== 'This log is set to private' &&
        !journal.includes(' has chosen to keep this log hidden') &&
        props.privateJournal && <Text>You made this log private</Text>}
    </View>
  );
};

export default LogBody;
