import React from 'react';
import { View, Picker, Text } from 'react-native';

export default function StateFilter(props) {
  console.log('STATE DOT STATE', props);
  return (
    <View>
      <Picker onValueChange={props.filter}>
        <Picker.Item selected label={props.state || 'Filter by State:'} />
        {props.states.map((state, key) => {
          return <Picker.Item key={key} label={state} value={state} />;
        })}
      </Picker>
    </View>
  );
}
