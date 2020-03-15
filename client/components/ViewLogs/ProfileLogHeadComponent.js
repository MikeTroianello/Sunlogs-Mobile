import React from 'react';
import { View, Text, Image } from 'react-native';

import { logCss } from '../../styles/LogStyles';

const ProfileLogHead = ({ day, month, year, weatherType, weatherIcon }) => {
  console.log('WEATHER ICON', weatherIcon);
  return (
    <View style={logCss.profileHead}>
      <Text>
        {month} {day}, {year}
      </Text>
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
