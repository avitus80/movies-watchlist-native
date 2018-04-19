import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Style from '../Style.js'
import Header from '../header/Header';
import MovieListContainer from './MovieListContainer';

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
      <View style={Style.subContainer}>
        <Text style={Style.titleText}>{pageTitle}</Text>
        {/*use unique key to force component remount*/}
        <MovieListContainer key={state.key} selection={select} />
      </View>
    );
  }

  render() {
    return (
      <View style={Style.mainContainer}>
        <Header title="Movies Watchlist" nav={this.props.navigation}/>
        { this._buildComponent() }
      </View>
    );
  }
}

export default MoviesContainer;