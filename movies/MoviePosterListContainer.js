import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import LoadingIndicator from '../LoadingIndicator';
import TMPENV from '../TmpEnv';

const STYLES = StyleSheet.create({
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

  _renderPosterList(item) {
    let imageURI = TMPENV.ENV_TMDB_POSTER_URI + TMPENV.ENV_TMDB_POSTER_SIZE + item.poster_path;

    return <Image source={{uri: `${imageURI}`}} style={STYLES.poster} />;
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