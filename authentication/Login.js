import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
import Config from 'react-native-config';

const STYLES = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sub: {
    width: 300,
  },
  text: {
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    height: 30,
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 5,
  },
  button: {
    marginTop: 10,
  },
});

class Login extends Component {
  static navigationOptions = {
    title: 'LOGIN'
  };
  
  constructor(props) {
    super(props);
    
    this.state = {
      username: "",
      password: "",
    };
  }

  _login() {
    this.setState({
      isLoggingIn: true,
    });
    
    const URL = Config.ENV_IP_ADDRESS + Config.ENV_HANDLE_LOGIN_URL;

    let loginData = {
      username: this.state.username,
      password: this.state.password,
    };

    fetch(URL, {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
    })
    //.then(res => res.text()) // returned content-type is text/plain
    .then(response => response.json()) // returned content-type is application/json
    .then(result => this._processLogin(result))
    .catch(error => {
      this.setState({
        isLoggingIn: false,
      });
      Alert.alert("Error", error.message);
    });
  }

  _processLogin(result) {
    if (result.loggedIn) {
      // hide keyboard
      Keyboard.dismiss();

      // go to user screen
      this.props.navigation.navigate("User");
    } else {
      this.setState({
        isLoggingIn: false,
      });
      Alert.alert("Login failed", result.errorMessage);
    }
  }

  _signup() {
    this.props.navigation.navigate("SignUp");
  }

  render() {
    return (
      <KeyboardAvoidingView style={STYLES.main} enabled>
        <View style={STYLES.sub}>
          <Text style={STYLES.text}>Username</Text>
          <TextInput style={STYLES.input} underlineColorAndroid="#fff" onChangeText={(text) => this.setState({username: text})} />
          
          <Text style={STYLES.text}>Password</Text>
          <TextInput style={STYLES.input} secureTextEntry={true} underlineColorAndroid="#fff" onChangeText={(text) => this.setState({password: text})} />
          
          <Button title="Login" onPress={() => this._login()} color="#f00" disabled={this.state.isLoggingIn}/>
          <View style={STYLES.button} />
          <Button title="Sign Up" onPress={() => this._signup()} color="#f00" />
          
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default Login;