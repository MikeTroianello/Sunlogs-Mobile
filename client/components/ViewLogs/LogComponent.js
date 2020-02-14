import React from 'react';
import { View, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';

const Log = props => {
  let weatherString;
  let genderIcon;
  let iconSource = 'foundation';
  //AS OF NOW, THE ICONS WILL ONLY SHOW THE DAYTIME IMAGES, FOR SIMPLICITY. THIS CAN BE CHANGED AT THE WEATHERSTRING VARIABLE
  if (props.log.weatherIcon) {
    weatherString = `http://openweathermap.org/img/wn/${props.log.weatherIcon.slice(
      0,
      -1
    )}d@2x.png`;
  } else weatherString = '';

  switch (props.log.creatorId.gender) {
    case 'male':
      genderIcon = 'male-symbol';
      break;
    case 'female':
      genderIcon = 'female-symbol';
      break;
    default:
      genderIcon = 'genderless';
      iconSource = 'font-awesome';
      break;
  }

  let theTag = props.log.creatorId.username;

  if (!props.log.demo) {
    theTag = (
      <Link to={`/view-profile/${props.log.creatorId._id}`}>
        {props.log.creatorId.username}
      </Link>
    );
  }

  if (
    props.log.creatorId.username ===
      'This user has decided to keep their name private' ||
    props.id === props.log.creatorId._id
  ) {
    theTag = props.log.creatorId.username;
  }

  return (
    <View className={props.test ? 'mock-log' : 'log'}>
      <View className='weather-box'>
        {props.id === props.log.creatorId._id ? (
          <Text>~(You!)~</Text>
        ) : (
          <Text>{theTag}</Text>
        )}

        <Icon name={genderIcon} type={iconSource} />
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: `http://openweathermap.org/img/wn/${props.log.weatherIcon.slice(
              0,
              -1
            )}d@2x.png`
          }}
        />

        <Text> {props.log.weatherType}</Text>
      </View>
      {props.log.creatorId.username !==
        'This user has decided to keep their name private' &&
        props.log.hideCreator && (
          <Text>You have hidden your name for this log</Text>
        )}

      <Text>
        {props.log.county} County, {props.log.state}
      </Text>
      <View className='mood-and-productivity'>
        <Text>Mood: {props.log.mood}</Text>
        <Text>
          Productivity: <Text>{props.log.productivity}</Text>
        </Text>
      </View>
      <Text>Log: {props.log.journal}</Text>
      {props.log.journal !== 'This log is set to private' &&
        props.log.privateJournal && <Text>You made this log private</Text>}
    </View>
  );
};

export default Log;
