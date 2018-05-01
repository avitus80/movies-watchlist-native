import { TabNavigator } from 'react-navigation';
import Info from './Info';
import Cast from './Cast';
import Trailers from './Trailers';

const MOVIE_NAV = TabNavigator({
  Info: {
    screen: Info
  },
  Cast: {
    screen: Cast
  },
  Trailers: {
    screen: Trailers
  }
}, {
  initialRouteName: 'Info',
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

export default MOVIE_NAV;