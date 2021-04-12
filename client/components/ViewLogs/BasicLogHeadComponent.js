import React from 'react';
import { View, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';

import { logCss } from '../../styles/LogStyles';

const BasicLogHead = ({
  theTag,
  logStyle,
  samePerson,
  genderIcon,
  iconSource,
  ...props
}) => {
  return (
    <View style={logCss.profileHead}>
      <View>
        {samePerson ? (
          <Text style={logCss.nameHidden}>~(You!)~</Text>
        ) : theTag == 'This user has decided to keep their name private' ||
          props.privateAccount ? (
          <Text style={logCss.nameHidden}>{'Name is private...'}</Text>
        ) : props.demo ? (
          <Text style={logCss.name}>{theTag}</Text>
        ) : (
          <Text
            style={logCss.name}
            onPress={() => props.passUpName(theTag, props.id)}
          >
            {theTag}
          </Text>
        )}
        {props.hideCreator && props.samePerson && (
          <Text>Your name is hidden</Text>
        )}
      </View>

      <Icon name={genderIcon} type={iconSource} size={35} />
      <View style={logCss.weatherAndType}>
        <Image
          style={{ width: 60, height: 50 }}
          source={{
            uri: `http://openweathermap.org/img/wn/${props.weatherIcon.slice(
              0,
              -1
            )}d@2x.png`,
          }}
        />
        <Text style={logCss.weatherType}> {props.weatherType}</Text>
      </View>
    </View>
  );
};

export default BasicLogHead;
