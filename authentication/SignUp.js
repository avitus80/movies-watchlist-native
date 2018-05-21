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
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
    };
  }

  _signup() {
    this.setState({
      isRegistering: true,
    });

    const URL = Config.ENV_IP_ADDRESS + Config.ENV_HANDLE_SIGNUP_URL;

    let signupData = {
      username: this.state.username,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
    };

    fetch(URL, {
      method: 'POST',
      body: JSON.stringify(signupData),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    })
    .then(response => response.json()) // returned content-type is application/json
    .then(result => this._processSignup(result))
    .catch(error => {
      this.setState({
        isRegistering: false,
      });
      Alert.alert("Error", error.message)
    });
  }

  _processSignup(result) {
    if (result.isRegistered) {
      // hide keyboard
      Keyboard.dismiss();

      Alert.alert("Successful", "Registration done!");

      // go to login screen
      this.props.navigation.navigate("Login");
    } else {
      this.setState({
        isRegistering: false,
      });
      Alert.alert("Sign up failed", result.errorMessage);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={STYLES.main} enabled>
        <View style={STYLES.sub}>
          <Text style={STYLES.text}>Username</Text>
          <TextInput style={STYLES.input} underlineColorAndroid="#fff" onChangeText={(text) => this.setState({username: text})} />

          <Text style={STYLES.text}>Password</Text>
          <TextInput style={STYLES.input} secureTextEntry={true} underlineColorAndroid="#fff" onChangeText={(text) => this.setState({password: text})} />

          <Text style={STYLES.text}>First name</Text>
          <TextInput style={STYLES.input} underlineColorAndroid="#fff" onChangeText={(text) => this.setState({firstname: text})} />

          <Text style={STYLES.text}>Last name</Text>
          <TextInput style={STYLES.input} underlineColorAndroid="#fff" onChangeText={(text) => this.setState({lastname: text})} />

          <Text style={STYLES.text}>Email</Text>
          <TextInput style={STYLES.input} underlineColorAndroid="#fff" onChangeText={(text) => this.setState({email: text})} />

          <Button title="Sign Up" onPress={() => this._signup()} color="#f00" disabled={this.state.isRegistering}/>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default SignUp;