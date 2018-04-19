import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ENV_TMDB_API_KEY = "";
const ENV_TMDB_URL = "";
const ENV_TMDB_URL_QUERY_OPTION = "";
const ENV_TMDB_POSTER_URI = "";
const ENV_TMDB_POSTER_SIZE = "";

const STYLES = StyleSheet.create({
  container: {
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
    fontWeight: 'bold'
  },
  movieText: {
    fontSize: 18,
    color: '#808080',
  }
});

class MovieListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    let fullURL = ENV_TMDB_URL + this.props.selection + "?api_key=" + ENV_TMDB_API_KEY + ENV_TMDB_URL_QUERY_OPTION;
    
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

  _renderMovieList(item) {
    let imageURI = ENV_TMDB_POSTER_URI + ENV_TMDB_POSTER_SIZE + item.poster_path;

    let overview = item.overview;
    if (overview.length > 60) {
      let lastSpace = overview.lastIndexOf(' ', 60);
      overview = overview.slice(0, lastSpace) + '...';
    }

    return (
      <View style={STYLES.container} key={item.id}>
        <Image source={{uri: `${imageURI}`}} style={STYLES.poster} />
        <View style={STYLES.infoContainer}>
          <Text style={STYLES.movieTitle}>{item.title}</Text>
          <Text style={STYLES.movieText}>{item.release_date.substring(0, 4)}</Text>
          <Text><Ionicons name='ios-star' size={15} color='#ffa500' />  <Text style={STYLES.movieText}>{item.vote_average}</Text></Text>
          <Text style={STYLES.movieText}>{overview}</Text>
        </View>
      </View>
    );
  }

  _getKey(item, index) {
    return item.id.toString();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={80} color="#f00" />
        </View>
      );
    }

    return (
      <FlatList
        data={this.state.movieData}
        renderItem={ ({item}) => this._renderMovieList(item) }
        keyExtractor={ (item, index) => this._getKey(item, index) }
      />
    );
  }
}

export default MovieListContainer;

/*
  ***** SAMPLE DATA *****

  "adult": false,
  "backdrop_path": "/askg3SMvhqEl4OL52YuvdtY40Yb.jpg",
  "genre_ids": Array [
    12,
    35,
    10751,
    16,
  ],
  "id": 354912,
  "original_language": "en",
  "original_title": "Coco",
  "overview": "Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguel's family history.",
  "popularity": 245.408243,
  "poster_path": "/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg",
  "release_date": "2017-10-27",
  "title": "Coco",
  "video": false,
  "vote_average": 7.8,
  "vote_count": 3837,
*/