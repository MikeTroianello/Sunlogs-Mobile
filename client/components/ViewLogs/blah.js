<View className={props.test ? 'mock-log' : 'log'}>
  <View className='log-head '>
    <Text className='name-and-gender'>
      <Text className='name-box'>
        {props.id === props.log.creatorId._id ? <i>~(You!)~</i> : theTag}
      </Text>
      <View className='gender'>
        {/* <FontAwesomeIcon icon={genderIcon} size='2x' /> */}
      </View>
      <View className='weather-box'>
        {/* <img
              className='weather-icon'
              src={weatherString}
              alt={props.log.weatherType}
            /> */}

        <Text> {props.log.weatherType}</Text>
      </View>
    </Text>
    {props.log.creatorId.username !==
      'This user has decided to keep their name private' &&
      props.log.hideCreator && <i>You have hidden your name for this log</i>}
  </View>
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
    props.log.privateJournal && <i>You made this log private</i>}
</View>;

let weatherString;
let genderIcon;
//AS OF NOW, THE ICONS WILL ONLY SHOW THE DAYTIME IMAGES, FOR SIMPLICITY. THIS CAN BE CHANGED AT THE WEATHERSTRING VARIABLE
if (props.log.weatherIcon) {
  weatherString = `http://openweathermap.org/img/wn/${props.log.weatherIcon.slice(
    0,
    -1
  )}d@2x.png`;
} else weatherString = '';

// switch (props.log.creatorId.gender) {
//   case 'male':
//     genderIcon = male;
//     break;
//   case 'female':
//     genderIcon = female;
//     break;
//   default:
//     genderIcon = nonbinary;
//     break;
// }

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
