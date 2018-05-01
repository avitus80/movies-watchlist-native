import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const STYLES = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000'
  },
  text: {
    color: '#fff'
  }
});

class Cast extends Component {
  render() {
    return (
      <View style={STYLES.mainContainer}>
        <Text style={STYLES.text}>Cast</Text>
      </View>
    );
  }
}

export default Cast;