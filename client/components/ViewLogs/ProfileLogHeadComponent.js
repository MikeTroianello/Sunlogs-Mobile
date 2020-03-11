import React from 'react';
import { View, Text, Image } from 'react-native';

const ProfileLogHead = ({ day, month, year, weather, weatherIcon }) => {
  console.log('WEATHER ICON', weatherIcon);
  return (
    <View>
      <Text>
        {month} {day}, {year}
      </Text>
      <View>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: `http://openweathermap.org/img/wn/${weatherIcon.slice(
              0,
              -1
            )}d@2x.png`
          }}
        />
        <Text>{weather}</Text>
      </View>
    </View>
  );
};

export default ProfileLogHead;
