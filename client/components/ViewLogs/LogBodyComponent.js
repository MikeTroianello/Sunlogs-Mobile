import React from 'react';
import { View, Text } from 'react-native';

const LogBody = props => {
  return (
    <View>
      <Text>
        {props.county} County, {props.state}
      </Text>
      <View className='mood-and-productivity'>
        <Text>Mood: {props.mood}</Text>
        <Text>
          Productivity: <Text>{props.productivity}</Text>
        </Text>
      </View>
      <Text>Log: {props.journal}</Text>
      {props.journal !== 'This log is set to private' &&
        props.privateJournal && <Text>You made this log private</Text>}
    </View>
  );
};

export default LogBody;
