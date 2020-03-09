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
