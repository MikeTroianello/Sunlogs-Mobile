import React from 'react';
import { View, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';

const BasicLogHead = ({
  theTag,
  logStyle,
  samePerson,
  genderIcon,
  iconSource,
  ...props
}) => {
  return (
    <View className='weather-box'>
      {samePerson ? (
        <Text>~(You!)~</Text>
      ) : theTag == 'This user has decided to keep their name private' ||
        props.privateAccount ? (
        <Text>{theTag}</Text>
      ) : (
        <Text style={{ color: logStyle }}>{theTag}</Text>
      )}

      <Icon name={genderIcon} type={iconSource} />
      <Image
        style={{ width: 50, height: 50 }}
        source={{
          uri: `http://openweathermap.org/img/wn/${props.weatherIcon.slice(
            0,
            -1
          )}d@2x.png`
        }}
      />

      <Text> {props.weatherType}</Text>
    </View>
  );
};

export default BasicLogHead;
