import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, Linking } from 'react-native';
import LoadingIndicator from '../LoadingIndicator';
import Config from 'react-native-config';

const STYLES = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000'
  },
  trailerContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
  thumbnails: {
    width: 120,
    height: 90,
    backgroundColor: '#fff',
  },
  titleContainer: {
    flex: 1,
    padding: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  }
});

class Trailers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      trailers: []
    }
  }

  componentDidMount() {
    this.props.screenProps.trailers.map((item) => {
      let fullURL = Config.ENV_YT_VIDEO_URL + "?id=" + item.key + "&key=" + Config.ENV_YT_API_KEY + Config.ENV_YT_VIDEO_URL_OPTION;

      fetch(fullURL)
      .then((response) => response.json())
      .then((responseJson) => {
        let trailers = this.state.trailers;
        trailers.push(responseJson.items[0]);

        this.setState({
          isLoading: false,
          trailers: trailers
        });
      })
      .catch((error) => {
        console.log(error);
      });
    });
  }

  _getKey(item, index) {
    return item.id;
  }

  _openYoutube(id) {
    let url = Config.ENV_YT_URL + "?v=" + id;
    
    Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        console.log("Can't open URL: " + url);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  _renderTrailer(item) {
    return (
      <TouchableOpacity style={STYLES.trailerContainer} activeOpacity={1} onPress={() => this._openYoutube(item.id)}>
        <Image source={{uri: `${item.snippet.thumbnails.default.url}`}} style={STYLES.thumbnails} />
        <View style={STYLES.titleContainer}>
          <Text style={STYLES.title}>{item.snippet.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _renderTrailerList() {
    return <FlatList data={this.state.trailers} renderItem={ ({item}) => this._renderTrailer(item) } keyExtractor={ (item, index) => this._getKey(item, index) } />;
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }
    
    return (
      <View style={STYLES.mainContainer}>
        { this._renderTrailerList() }
      </View>
    );
  }
}

export default Trailers;