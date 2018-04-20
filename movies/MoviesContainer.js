import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MovieListContainer from './MovieListContainer';

const STYLES = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: '#000'
  },
  titleText: {
    marginBottom: 5,
    color: '#fff',
    fontSize: 20,
  }
});

class MoviesContainer extends Component {
  static navigationOptions = ({navigation}) => {
    const {routeName} = navigation.state;
    let title = null;

    if (routeName === 'NowPlaying') {
      title = 'NOW PLAYING';
    } else if (routeName === 'Upcoming') {
      title = 'UPCOMING';
    } else if (routeName === 'Popular') {
      title = 'POPULAR';
    } else if (routeName === 'TopRated') {
      title = 'TOP RATED';
    }

    return {
      drawerLabel: title
    };
  };

  _buildComponent() {
    let state = this.props.navigation.state;
    let pageTitle = null;

    if (state.routeName === 'NowPlaying') {
      pageTitle = 'Now Playing';
      select="now_playing";
    } else if (state.routeName === 'Upcoming') {
      pageTitle = 'Upcoming';
      select="upcoming";
    } else if (state.routeName === 'Popular') {
      pageTitle = 'Popular';
      select="popular";
    } else if (state.routeName === 'TopRated') {
      pageTitle = 'Top Rated';
      select="top_rated";
    }

    return (
      <View style={STYLES.mainContainer}>
        <Text style={STYLES.titleText}>{pageTitle}</Text>
        {/* use unique key to force component to remount */}
        <MovieListContainer key={state.key} selection={select} />
      </View>
    );
  }

  render() {
    return this._buildComponent();
  }
}

export default MoviesContainer;