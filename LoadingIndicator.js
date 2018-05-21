import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class LoadingIndicator extends Component {
  render() {
    return (
      <View style={STYLES.container}>
        <ActivityIndicator size={ this.props.size ? this.props.size : 80 } color="#f00" />
      </View>
    );
  }
}

export default LoadingIndicator;