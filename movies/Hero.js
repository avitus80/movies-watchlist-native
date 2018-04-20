import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import LoadingIndicator from '../LoadingIndicator';

const ENV_TMDB_API_KEY = "";
const ENV_TMDB_URL = "";
const ENV_TMDB_URL_QUERY_OPTION = "";
const ENV_TMDB_BACKDROP_URI = "";
const ENV_TMDB_BACKDROP_SIZE = "";

const STYLES = StyleSheet.create({
  swiper: {
    height: 250
  },
  backdrop: {
    flex: 1
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
    let fullURL = ENV_TMDB_URL + "?api_key=" + ENV_TMDB_API_KEY + ENV_TMDB_URL_QUERY_OPTION;

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

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }

    return (
      <Swiper style={STYLES.swiper} dotColor="#fff" activeDotColor="#f00">
        {
          this.state.movieData.map((item) => {
            let imageURI = ENV_TMDB_BACKDROP_URI + ENV_TMDB_BACKDROP_SIZE + item.backdrop_path;

            return <Image source={{uri: `${imageURI}`}} style={STYLES.backdrop} key={item.id} />;
          })
        }
      </Swiper>
    );
  }
}

export default Hero;