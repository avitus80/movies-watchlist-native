import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Home from './movies/Home';
import Search from './Search';
import MoviesContainer from './movies/MoviesContainer';
import Login from './authentication/Login';
import WatchList from './dashboard/WatchList';

const USER_NAV = StackNavigator({
  Login: {
    screen: Login
  },
  WatchList: {
    screen: WatchList
  }
}, {
  headerMode: 'none'
});

const MOVIE_NAV = DrawerNavigator ({
  Home: {
    screen: Home
  },
  Search: {
    screen: Search
  },
  NowPlaying: {
    screen: MoviesContainer
  },
  Upcoming: {
    screen: MoviesContainer
  },
  Popular: {
    screen: MoviesContainer
  },
  TopRated: {
    screen: MoviesContainer
  },
  Login: {
    screen: USER_NAV
  }
}, {
  initialRouteName: 'Home',
  drawerBackgroundColor: '#1a1a1a',
  drawerWidth: 250,
  contentOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: '#f00',
    inactiveTintColor:'#fff'
  }
});

const ROOT_NAV = StackNavigator({
  Main: {
    screen: MOVIE_NAV
  }
});

class App extends Component {
  render() {
    return <MOVIE_NAV />
  }
}

export default App;