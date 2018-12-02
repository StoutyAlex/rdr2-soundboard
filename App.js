import React, {Component} from 'react';
import sounds from './app/sounds';
import {StyleSheet, 
  Text,
  FlatList,
  View,
  Dimensions,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';

var Sound = require('react-native-sound');

Sound.setCategory('Playback');

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }
  return data;
};

const numColumns = 3;
export default class App extends Component {

  playSound = (uri) => {
    let sound = new Sound(`${uri}.mp3`, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        return;
      } else {
        sound.play((success) => {
          if (success) {
            return;
          } else {
            sound.reset();
          }
        });
      }
    });
  };

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <ImageBackground 
        style={styles.button}
        imageStyle={{borderRadius: 25}}
        blurRadius={1}
        source={item.image}>
        <TouchableHighlight
          onPress={() => this.playSound(item.uri)}
          underlayColor='rgba(255, 255, 255, 0)'>
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableHighlight>
      </ImageBackground>
    );
  };

  render() {
    return (
      <FlatList
        data={formatData(sounds, numColumns)}
        style={styles.container}
        renderItem={this.renderItem}
        numColumns={numColumns}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d41936'
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 3,
    height: Dimensions.get('window').width / numColumns - 3, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    padding: 5,
    color: 'rgba(255, 255, 255, 0.75)',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 0},
    textShadowRadius: 50,
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'chinese rocks rg'
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 3,
    height: Dimensions.get('window').width / numColumns - 3, // approximate a square
  }
});