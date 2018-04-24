import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import LoadingIndicator from '../LoadingIndicator';
import TMPENV from '../TmpEnv';

const STYLES = StyleSheet.create({
  swiper: {
    height: 250,
    backgroundColor: '#000'
  },
  backdrop: {
    flex: 1,
    opacity: 0.5
  }
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

  _renderSwiperItem(item) {
    let imageURI = TMPENV.ENV_TMDB_BACKDROP_URI + TMPENV.ENV_TMDB_BACKDROP_SIZE + item.backdrop_path;

    return (
      <Image source={{uri: `${imageURI}`}} style={STYLES.backdrop} key={item.id} />
    );
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }

    return (
      <Swiper style={STYLES.swiper} dotColor="#fff" activeDotColor="#f00">
        { this.state.movieData.map((item) => this._renderSwiperItem(item)) }
      </Swiper>
    );
  }
}

export default Hero;