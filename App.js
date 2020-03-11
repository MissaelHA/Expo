import React, {Component} from 'react';
import Contenedor from './paginas/contenedor';

class App extends Component{
  render(){
    return(
      <Contenedor />
    )
  }
}
export default App;
/*import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, Picker } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import Conatiner from './paginas/contenedor'

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Card>
          <Conatiner />
        </Card>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
*/