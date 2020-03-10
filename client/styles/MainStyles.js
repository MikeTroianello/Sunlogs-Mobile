import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
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

export const SignUpCss = StyleSheet.create({
  wholePage: {
    backgroundColor: '#e0e7ef',
    justifyContent: 'center'
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
