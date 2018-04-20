import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Hero from './Hero';

const STYLES = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  titleText: {
    color: '#fff',
    fontSize: 25,
    alignSelf: 'center'
  }
});

class Home extends Component {
  static navigationOptions = {
    drawerLabel: 'HOME'
  }

  render() {
    return (
      <View style={STYLES.mainContainer}>
        <ScrollView>
          <Hero />
          {/* <Text style={STYLES.titleText}>UNDER CONSTRUCTION</Text> */}
          {/* For testing purpose */}
          {/* <View style={{height: 500, backgroundColor: '#f00'}}>
            <Text>HERO</Text>
          </View>
          <View style={{height: 500, backgroundColor: '#0f0'}}>
            <Text>Popular</Text>
          </View>
          <View style={{height: 500, backgroundColor: '#00f'}}>
            <Text>Now Playing</Text>
          </View> */}
        </ScrollView>
      </View>
    );
  }
}

export default Home;