import React from 'react';
import { View, Picker } from 'react-native';

export default function CountyFilter(props) {
  return (
    <View>
      <Picker onValueChange={props.filter}>
        <Picker.Item selected label={props.county || 'Filter by County:'} />
        {props.counties.map((county, key) => {
          return <Picker.Item key={key} value={county} label={county} />;
        })}
      </Picker>
    </View>
  );
}
