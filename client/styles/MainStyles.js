import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e7ef',
    alignItems: 'center',
    justifyContent: 'center'
  },
  createLogContainer: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  log: {
    margin: 10,
    padding: 5,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000'
  }
});

export const LoginCss = StyleSheet.create({
  wholePage: {
    backgroundColor: '#e0e7ef',
    height: '100%',
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  loginHeader: {
    textAlign: 'center',
    fontSize: 35
  },
  loginComponent: {
    borderWidth: 1,
    margin: 30,
    padding: 10,
    backgroundColor: '#f4f9ff'
  },
  submitButton: {
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 50
  },
  // signUpButton: {
  //   color: 'pink',
  //   backgroundColor: 'black',
  //   marginLeft: 20,
  //   marginRight: 20,
  //   marginTop: 50
  // },
  signUpButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  backToLoginButton: {
    // justifyContent: 'flex-end',
    // marginLeft: 20,
    // marginRight: 20,
    // marginTop: 30
  }
});

export const SignUpCss = StyleSheet.create({
  wholePage: {
    backgroundColor: '#e0e7ef',
    justifyContent: 'center'
  },
  loginHeader: {
    textAlign: 'center',
    fontSize: 35
  },
  loginComponent: {
    borderWidth: 1,
    margin: 30,
    padding: 10
  },
  submitButton: {
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 50
  },
  signUpButton: {
    color: 'pink',
    backgroundColor: 'black'
  }
});

export const ProfileCss = StyleSheet.create({
  wholePage: {
    backgroundColor: '#e0e7ef',
    justifyContent: 'center'
  }
});

export const OtherProfileCss = StyleSheet.create({
  wholePage: {
    backgroundColor: '#e0e7ef',
    justifyContent: 'center'
  }
});

export const LogCss = StyleSheet.create({
  wholePage: {
    backgroundColor: '#e0e7ef',
    justifyContent: 'center'
  }
});

export const ViewLogsCss = StyleSheet.create({
  wholePage: {
    backgroundColor: '#e0e7ef',
    justifyContent: 'center'
  }
});

export const CreateLogsCss = StyleSheet.create({
  wholePage: {
    backgroundColor: '#e0e7ef',
    justifyContent: 'center'
  }
});

export const SettingsCss = StyleSheet.create({
  wholePage: {
    backgroundColor: '#e0e7ef',
    justifyContent: 'center'
  },
  preferences: {
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 6,
    paddingRight: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  deleteTouchableOpacity: {
    backgroundColor: 'rgba(255,0,0,0.3)',
    height: 55,
    justifyContent: 'center',
    marginTop: 20,
    textAlign: 'center',
    borderBottomColor: 'red',
    borderBottomWidth: 1,
    borderTopColor: 'rgba(255,0,0,0.6)',
    borderTopWidth: 1
  }
});

export const deleteCss = StyleSheet.create({});

export const weatherboxCss = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: 'gray',
    margin: 5,
    padding: 3
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center'
  },
  subHeaderThird: {
    width: '44%'
    // justifyContent: 'flex-end',
    // textAlign: 'right'
  }
});

export const FilterStyle = {
  genderBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',

    width: '70%',
    marginLeft: '15%',
    marginRight: '15%',
    marginTop: '5%',
    marginBottom: '5%'

    // borderWidth: 1
  },
  genderIconBoxLeft: {
    width: '33%',
    borderWidth: 1,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15
    // backgroundColor: '#8ec2ea'
  },
  genderIconBoxMiddle: {
    width: '33%',
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  genderIconBoxRight: {
    width: '33%',
    borderWidth: 1,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15
  },
  genderIconChosen: {
    backgroundColor: '#8ec2ea'
  }
};
