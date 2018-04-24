import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Hero from './Hero';
import MoviePosterListContainer from './MoviePosterListContainer';

const STYLES = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  listContainer: {
    height: 250,
    backgroundColor: '#000',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  titleText: {
    color: '#fff',
    fontSize: 18
  },
});

class Home extends Component {
  static navigationOptions = {
    drawerLabel: 'HOME'
  }

  _renderList(title, nav, selection) {
    return (
      <View style={STYLES.listContainer}>
        <View style={STYLES.titleContainer}>
          <Text style={STYLES.titleText}>{title}</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate(nav)}>
            <View>
              <Text style={STYLES.titleText}>See all</Text>
            </View>
          </TouchableOpacity>
        </View>
        <MoviePosterListContainer selection={selection} />
      </View>
    );
  }

  render() {
    return (
      <View style={STYLES.mainContainer}>
        <ScrollView>
          <Hero />
          { this._renderList("Now Playing", "NowPlaying", "now_playing") }
          { this._renderList("Upcoming", "Upcoming", "upcoming") }
          { this._renderList("Popular", "Popular", "popular") }
          { this._renderList("Top Rated", "TopRated", "top_rated") }
        </ScrollView>
      </View>
    );
  }
}

export default Home;