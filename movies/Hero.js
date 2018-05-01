import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import LoadingIndicator from '../LoadingIndicator';
import TMPENV from '../TmpEnv';

const STYLES = StyleSheet.create({
  swiper: {
    height: 250,
    backgroundColor: '#000',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  backdrop: {
    flex: 1,
    opacity: 0.3,
  },
  movieContainer: {
    width: 320,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  poster: {
    width: 135,
    height: 200,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  movieTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  overviewText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
    flexGrow: 1,
  },
});

class Hero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      movieData: []
    }
  }

  componentDidMount() {
    let fullURL = TMPENV.ENV_TMDB_DISCOVER_URL + "?api_key=" + TMPENV.ENV_TMDB_API_KEY + TMPENV.ENV_TMDB_DISCOVER_URL_OPTION;

    fetch(fullURL)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        movieData: responseJson.results.slice(0, 5) // only show the first 5 results
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  _showMovieDetails(movie) {
    this.props.navigation.navigate('Movie', {
      movieId: movie.id
    });
  }

  _renderSwiperItem(item) {
    let backdropURI = TMPENV.ENV_TMDB_BACKDROP_URI + TMPENV.ENV_TMDB_BACKDROP_SIZE + item.backdrop_path;
    let posterURI = TMPENV.ENV_TMDB_POSTER_URI + TMPENV.ENV_TMDB_POSTER_SIZE + item.poster_path;
    
    let overview = item.overview;
    if (overview.length > 85) {
      let lastSpace = overview.lastIndexOf(' ', 85);
      overview = overview.slice(0, lastSpace) + '...';
    }

    return (
      <View style={STYLES.mainContainer} key={item.id}>
        <View style={STYLES.backdropContainer}>
          <Image source={{uri: `${backdropURI}`}} style={STYLES.backdrop} />
        </View>
        <View style={STYLES.movieContainer}>
          <Image source={{uri: `${posterURI}`}} style={STYLES.poster} />
          <View style={STYLES.infoContainer}>
            <Text style={STYLES.movieTitle}>{item.title}</Text>
            <Text style={STYLES.ratingText}>Rating:  <Ionicons name='ios-star' size={15} color='#ffa500' />  {item.vote_average}</Text>
            <Text style={STYLES.overviewText}>{overview}</Text>
            <Button title="DETAILS" onPress={() => this._showMovieDetails(item)} color="#f00" />
          </View>
        </View>
      </View>
    );
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }

    return (
      <Swiper style={STYLES.swiper} dotColor="#fff" activeDotColor="#f00" showsPagination={false}>
        { this.state.movieData.map((item) => this._renderSwiperItem(item)) }
      </Swiper>
    );
  }
}

export default Hero;