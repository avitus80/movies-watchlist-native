import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
import Home from './movies/Home';
import Search from './Search';
import MoviesContainer from './movies/MoviesContainer';
import Login from './authentication/Login';
import WatchList from './dashboard/WatchList';
import Profile from './dashboard/Profile';
import SignUp from './authentication/SignUp';
import MenuButton from './header/MenuButton';
import Movie from './movie/Movie';

// ignore yellow box warnings
console.ignoredYellowBox = ['Warning: componentWillMount', 'Warning: componentWillReceiveProps', 'Warning: componentWillUpdate', 'Warning: isMounted'];

const USER_NAV = TabNavigator({
  WatchList: {
    screen: WatchList
  },
  Profile: {
    screen: Profile
  }
}, {
  initialRouteName: 'WatchList',
  tabBarOptions: {
    activeTintColor: '#fff',
    inactiveTintColor:'#fff',
    indicatorStyle: {
      backgroundColor: '#f00'
    },
    style: {
      backgroundColor: '#000'
    }
  }
});

const AUTH_NAV = StackNavigator({
  Login: {
    screen: Login
  },
  User: {
    screen: USER_NAV
  },
  SignUp: {
    screen: SignUp
  },
}, {
  headerMode: 'none'
});

const MOVIE_NAV = DrawerNavigator ({
  Home: {
    screen: Home
  },
  /* Search: {
    screen: Search
  }, */
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
  Movie: {
    screen: Movie
  },
  Login: {
    screen: AUTH_NAV
  }
}, {
  initialRouteName: 'Home',
  drawerBackgroundColor: '#1a1a1a',
  drawerWidth: 250,
  contentOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: '#f00',
    inactiveTintColor:'#fff',
  }
});

const ROOT_NAV = StackNavigator({
  Main: {
    screen: MOVIE_NAV
  }
}, {
  initialRouteName: 'Main',
  navigationOptions: ({navigation}) => ({
    headerStyle: {
      backgroundColor: '#000',
      borderColor: '#696969',
      borderBottomWidth: 1
    },
    title: 'Movies Watchlist',
    headerTitleStyle: {
      flex: 1, // for textAlign to work properly
      color: '#fff',
      fontSize: 25,
      borderWidth: 1,
      textAlign: 'center'
    },
    headerLeft: <MenuButton nav={navigation}/>,
    headerRight: <View /> // to center align title
  })
});

class App extends Component {
  render() {
    return <ROOT_NAV />
  }
}

export default App;