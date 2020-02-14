import React from 'react';
import { View, Picker, Text } from 'react-native';

export default function StateFilter(props) {
  console.log('here????????????????', props.states);
  return (
    <View>
      <Picker onValueChange={props.filter}>
        <Picker.Item
          selected
          label='Filter by State:'
          value='Filter by State:'
        />
        {props.states.map((state, key) => {
          console.log('STATE', state);
          return <Picker.Item key={key} label={state} value={state} />;
        })}
      </Picker>
    </View>
  );
}
