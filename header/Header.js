import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import MenuButton from './MenuButton';

const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#000',
    borderColor: '#696969',
    borderBottomWidth: 1
  },
  header: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

class Header extends Component {
  render() {
    return (
      <View style={STYLES.container}>
        <MenuButton nav={this.props.nav}/>
        <Text style={STYLES.header}>{this.props.title}</Text>
      </View>
    );
  }
}

export default Header;