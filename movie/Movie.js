import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import MovieNav from './MovieNav';
import LoadingIndicator from '../LoadingIndicator';
import TMPENV from '../TmpEnv';

const STYLES = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    color: '#fff'
  }
});

class Movie extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    const movieId = this.props.navigation.state.params.movieId;

    let fullURL = TMPENV.ENV_TMDB_MOVIE_URL + movieId + "?api_key=" + TMPENV.ENV_TMDB_API_KEY + TMPENV.ENV_TMDB_MOVIE_URL_APPEND;

    fetch(fullURL)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        movie: responseJson,
        casts: responseJson.credits.cast,
        trailers: responseJson.videos.results,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }

    let imageURI = TMPENV.ENV_TMDB_BACKDROP_URI + TMPENV.ENV_TMDB_BACKDROP_SIZE + this.state.movie.backdrop_path;

    return (
      <View style={STYLES.mainContainer}>
        <Text style={STYLES.title}>{this.state.movie.id} : {this.state.movie.title}</Text>
        <Image source={{uri: `${imageURI}`}} style={{height: 200}} />
        <MovieNav screenProps={{casts: this.state.casts, trailers: this.state.trailers}}/>
      </View>
    );
  }
}

export default Movie;