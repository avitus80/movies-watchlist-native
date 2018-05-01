import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoadingIndicator from '../LoadingIndicator';
import TMPENV from '../TmpEnv';

const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden'
  },
  poster: {
    width: 135,
    height: 200
  },
  infoContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  movieText: {
    fontSize: 18,
    color: '#808080',
    marginBottom: 2
  }
});

class MovieListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    let fullURL = TMPENV.ENV_TMDB_MOVIE_URL + this.props.selection + "?api_key=" + TMPENV.ENV_TMDB_API_KEY + TMPENV.ENV_TMDB_MOVIE_URL_OPTION;
    
    fetch(fullURL)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        movieData: responseJson.results
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

  _renderMovieList(item) {
    let imageURI = TMPENV.ENV_TMDB_POSTER_URI + TMPENV.ENV_TMDB_POSTER_SIZE + item.poster_path;

    let overview = item.overview;
    if (overview.length > 70) {
      let lastSpace = overview.lastIndexOf(' ', 70);
      overview = overview.slice(0, lastSpace) + '...';
    }

    return (
      <TouchableOpacity style={STYLES.container} activeOpacity={1} onPress={() => this._showMovieDetails(item)}>
        <Image source={{uri: `${imageURI}`}} style={STYLES.poster} />
        <View style={STYLES.infoContainer}>
          <Text style={STYLES.movieTitle}>{item.title}</Text>
          <Text style={STYLES.movieText}>{item.release_date.substring(0, 4)}</Text>
          <Text style={STYLES.movieText}>Rating:  <Ionicons name='ios-star' size={15} color='#ffa500' />  {item.vote_average}</Text>
          <Text style={STYLES.movieText}>{overview}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _getKey(item, index) {
    return item.id.toString();
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }

    return <FlatList data={this.state.movieData} renderItem={ ({item}) => this._renderMovieList(item) } keyExtractor={ (item, index) => this._getKey(item, index) } />;
  }
}

export default MovieListContainer;