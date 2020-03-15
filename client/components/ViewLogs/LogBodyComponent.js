import React from 'react';
import { View, Text } from 'react-native';
import { logCss } from '../../styles/LogStyles';

const LogBody = props => {
  return (
    <View>
      <Text>
        {props.county} County, {props.state}
      </Text>
      <View style={logCss.moodBox}>
        <View style={logCss.moodSubBox}>
          <Text>Mood:</Text>
          <Text style={{ color: '#ED3833' }}>{props.mood}</Text>
        </View>
        <View style={logCss.moodSubBox}>
          <Text>Productivity:</Text>
          <Text style={{ color: '#ED3833' }}>{props.productivity}</Text>
        </View>
      </View>
      <Text>Log: {props.journal}</Text>
      {props.journal !== 'This log is set to private' &&
        props.privateJournal && <Text>You made this log private</Text>}
    </View>
  );
};

export default LogBody;
