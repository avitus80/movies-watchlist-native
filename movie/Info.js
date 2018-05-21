import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const STYLES = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  text: {
    color: '#fff'
  }
});

class Info extends Component {
  render() {
    return (
      <View style={STYLES.mainContainer}>
        <Text style={STYLES.text}>Info</Text>
        <Text style={STYLES.text}>Under Construction</Text>
      </View>
    );
  }
}

export default Info;