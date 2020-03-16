import React from 'react';
import { View, Text, Image } from 'react-native';

import { logCss } from '../../styles/LogStyles';

const ProfileLogHead = ({ weatherType, weatherIcon, ...props }) => {
  return (
    <View style={logCss.profileHead}>
      <View style={logCss.dateAndPlace}>
        <Text style={{ fontSize: 17 }}>
          {props.month} {props.day}, {props.year}
        </Text>
        <Text style={{ fontSize: 16 }}>
          {props.county} County, {props.state}
        </Text>
      </View>
      <View style={logCss.weatherAndType}>
        <Image
          style={{ width: 60, height: 50 }}
          source={{
            uri: `http://openweathermap.org/img/wn/${weatherIcon.slice(
              0,
              -1
            )}d@2x.png`
          }}
        />
        <Text style={logCss.weatherType}>{weatherType}</Text>
      </View>
    </View>
  );
};

export default ProfileLogHead;
