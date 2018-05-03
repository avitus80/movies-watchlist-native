import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import LoadingIndicator from '../LoadingIndicator';
import Config from 'react-native-config';

const STYLES = StyleSheet.create({
  container: {
    flex: 1
  },
  poster: {
    width: 135,
    height: 200,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5
  },
});

class MoviePosterListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    let fullURL = Config.ENV_TMDB_MOVIE_URL + this.props.selection + "?api_key=" + Config.ENV_TMDB_API_KEY + Config.ENV_TMDB_MOVIE_URL_OPTION;
    
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

  _renderPosterList(item) {
    let imageURI = Config.ENV_TMDB_POSTER_URI + Config.ENV_TMDB_POSTER_SIZE + item.poster_path;

    return (
      <TouchableOpacity style={STYLES.container} activeOpacity={1} onPress={() => this._showMovieDetails(item)}>
        <Image source={{uri: `${imageURI}`}} style={STYLES.poster} />
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

    return <FlatList data={this.state.movieData} renderItem={ ({item}) => this._renderPosterList(item) } keyExtractor={ (item, index) => this._getKey(item, index) } horizontal />;
  }
}

export default MoviePosterListContainer;