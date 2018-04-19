import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Style from '../Style.js'
import Header from '../header/Header';

class MoviesHome extends Component {
  static navigationOptions = {
    drawerLabel: 'HOME'
  }

  render() {
    return (
      <View style={Style.mainContainer}>
        <Header title="Movies Watchlist" nav={this.props.navigation}/>
        <View style={{flex: 9, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#fff', fontSize: 25}}>UNDER CONSTRUCTION</Text>
        </View>
      </View>
    );
  }
}

export default MoviesHome;