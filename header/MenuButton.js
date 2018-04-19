import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const STYLES = StyleSheet.create({
  button: {
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    backgroundColor: '#000'
  }
});

class MenuButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.nav.navigate('DrawerToggle')}>
        <View style={STYLES.button}>
          <Ionicons style={{padding: 10}} name='ios-menu' size={30} color='#fff' />
        </View>
      </TouchableOpacity>
    );
  }
}

export default MenuButton;