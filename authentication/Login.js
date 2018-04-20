import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, Keyboard } from 'react-native';

const ENV_IP_ADDRESS = "";
const ENV_POST_URL = "";

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
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
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
    console.log(props);
    
    this.state = {
      username: "",
      password: "",
    };
  }

  _login() {
    const URL = "http://" + ENV_IP_ADDRESS + ENV_POST_URL;

    let loginData = {
      username: this.state.username,
      password: this.state.password,
    };

    fetch(URL, {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    })
    //.then(res => res.text()) // returned content-type is text/plain
    .then(response => response.json()) // returned content-type is application/json
    .then(result => this._processLogin(result))
    .catch(error => Alert.alert("Error", error.message));
  }

  _processLogin(result) {
    if (result.loggedIn) {
      // hide keyboard
      Keyboard.dismiss();

      this.props.navigation.navigate("WatchList");
    } else {
      Alert.alert("Login failed", "Invalid username/password.");
    }
  }

  _signup() {
    this.props.navigation.navigate("SignUp");
  }

  render() {
    return (
      <View style={STYLES.main}>
        <View style={STYLES.sub}>
          <Text style={STYLES.text}>Username</Text>
          <TextInput style={STYLES.input} underlineColorAndroid="#fff" onChangeText={(text) => this.setState({username: text})} />
          
          <Text style={STYLES.text}>Password</Text>
          <TextInput style={STYLES.input} secureTextEntry={true} underlineColorAndroid="#fff" onChangeText={(text) => this.setState({password: text})} />
          
          <Button title="Login" onPress={() => this._login()} color="#f00" />
          <View style={STYLES.button} /> 
          <Button title="Sign Up" onPress={() => this._signup()} color="#f00" />
        </View>
      </View>
    );
  }
}

export default Login;