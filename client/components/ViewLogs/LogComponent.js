import React from 'react';
import { View, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';

import ProfileLogHead from './ProfileLogHeadComponent';
import BasicLogHead from './BasicLogHeadComponent';
import LogBody from './LogBodyComponent';

import { logCss } from '../../styles/LogStyles';

const Log = props => {
  //THIS CREATED THE ICONS FOR USER GENDER
  let genderIcon;
  let iconSource = 'foundation';

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

  const passUpName = (name, id) => {
    props.passUpName(name, id);
  };

  let samePerson;

  if (props.id === props.log.creatorId._id) {
    samePerson = true;
  } else {
    samePerson = false;
  }

  if (props.profile) {
    return (
      <View style={logCss.box}>
        <ProfileLogHead
          theTag={props.log.creatorId.username}
          weatherIcon={props.log.weatherIcon}
          weatherType={props.log.weatherType}
          day={props.log.dayOfMonth}
          month={props.log.month}
          year={props.log.year}
          county={props.log.county}
          state={props.log.state}
        />
        <LogBody
          county={props.log.county}
          state={props.log.state}
          mood={props.log.mood}
          productivity={props.log.productivity}
          journal={props.log.journal}
          privateJournal={props.log.privateJournal}
          hideCounty={true}
        />
      </View>
    );
  } else {
    // console.log('SAME PERSON WILL BE PASSED IN', samePerson);
    console.log('PROPSPSPSPSPSPSP', props);
    return (
      <View View style={logCss.box}>
        <BasicLogHead
          demo={false}
          samePerson={samePerson}
          genderIcon={genderIcon}
          iconSource={iconSource}
          privateAccount={props.privateAccount}
          passUpName={props.passUpName}
          theTag={props.log.creatorId.username}
          id={props.log.creatorId._id}
          hideCreator={props.log.hideCreator}
          weatherIcon={props.log.weatherIcon}
          weatherType={props.log.weatherType}
        />
        <LogBody
          county={props.log.county}
          state={props.log.state}
          mood={props.log.mood}
          productivity={props.log.productivity}
          journal={props.log.journal}
          privateJournal={props.log.privateJournal}
        />
      </View>
    );
  }
};

export default Log;

// return (
//   <View>
//     <View className='weather-box'>
//       {props.id === props.log.creatorId._id ? (
//         <Text>~(You!)~</Text>
//       ) : theTag == 'This user has decided to keep their name private' ||
//         props.privateAccount ? (
//         <Text>{theTag}</Text>
//       ) : (
//         <Text
//           style={{ color: logStyle }}
//           onPress={
//             props.log.demo
//               ? null
//               : () => props.passUpName(props.log.creatorId)
//           }
//         >
//           {theTag}
//         </Text>
//       )}

//       <Icon name={genderIcon} type={iconSource} />
//       <Image
//         style={{ width: 50, height: 50 }}
//         source={{
//           uri: `http://openweathermap.org/img/wn/${props.log.weatherIcon.slice(
//             0,
//             -1
//           )}d@2x.png`
//         }}
//       />

//       <Text> {props.log.weatherType}</Text>
//     </View>
//     {props.log.creatorId.username !==
//       'This user has decided to keep their name private' &&
//       props.log.hideCreator && (
//         <Text>You have hidden your name for this log</Text>
//       )}

//     <Text>
//       {props.log.county} County, {props.log.state}
//     </Text>
//     <View className='mood-and-productivity'>
//       <Text>Mood: {props.log.mood}</Text>
//       <Text>
//         Productivity: <Text>{props.log.productivity}</Text>
//       </Text>
//     </View>
//     <Text>Log: {props.log.journal}</Text>
//     {props.log.journal !== 'This log is set to private' &&
//       props.log.privateJournal && <Text>You made this log private</Text>}
//   </View>
// );

// <Text>
//         {props.log.county} County, {props.log.state}
//       </Text>
//       <View className='mood-and-productivity'>
//         <Text>Mood: {props.log.mood}</Text>
//         <Text>
//           Productivity: <Text>{props.log.productivity}</Text>
//         </Text>
//       </View>
//       <Text>Log: {props.log.journal}</Text>
//       {props.log.journal !== 'This log is set to private' &&
//         props.log.privateJournal && <Text>You made this log private</Text>}
