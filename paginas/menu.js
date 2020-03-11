import React,{Component} from 'react';
import{ Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

class Menu extends React.Component{
  static navigationOptions={
    title:"Menu",
    headerStyle:{
      backgroundColor:"#4287f5",
    }
  }
  render(){
    return(
      <View>
        <Text style={[{width: "100%",marginVertical: 10,height: 30,fontSize:20,color: "black",textAlign: "center"}]}>Menu</Text>
        <View style={[{width: "100%",marginVertical: 10,backgroundColor: "blue"}]}>
          <Button 
            onPress={() => this.props.navigation.navigate("Altas")}
            mode="contained">
            Altas
          </Button>
        </View>

        <View style={[{width: "100%",marginVertical: 10,backgroundColor: "red"}]}>
          <Button 
            onPress={() => this.props.navigation.navigate("Bajas")}
            mode="contained">
            Bajas
          </Button>
        </View>

        <View style={[{width: "100%",marginVertical: 10,backgroundColor: "red"}]}>
          <Button 
            onPress={() => this.props.navigation.navigate("Cambios")}
            mode="contained">
            Cambios
          </Button>
        </View>
      </View>
    )
  }

}
const styles = StyleSheet.create({
})
export default Menu;