import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Alert } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import Ajax from '../utils/Ajax';

class Baja extends Component{
  static navigationOptions={
    title:"Bajas",
    headerStyle:{
      backgroundColor:"#4287f5",
    }
  };

  state={
    codigo: "",
    errors: [],
    loading: false,
  }

  cambiacodigo=(inputText)=>{
    this.setState({codigo:inputText})
  }

  elimina=()=>{
    this.setState({loading: true});
    this.setState({errors: []});

    Ajax.get("https://prograwebphp.000webhostapp.com/eliminar", {Codigo: this.state.codigo})
    .then(response => {
      alert(response.data.message);
      this.setState({codigo: ''});
    })
    .catch(error => {
      if(error.response.data.message) alert(error.response.data.message);
      else this.setState({errors: error.response.data.Codigo});
    })
    .finally(() => this.setState({loading: false}))

  }

  render(){
    return(
      <View>
        <Text style={{width: "100%",margin: 10,height: 30,fontSize:20,color: "purple"}}>Altas</Text>

        <TextInput
          label="Codigo"
          mode="outlined"
          style={{width: "90%", marginHorizontal: "5%"}}
          onChangeText={codigo => this.setState({codigo})}
          value={this.state.codigo} />
        {
          this.state.errors.map((message, index) => {
            return <Text style={styles.errorMessage}>{ message }</Text>;
          })
        }

        <Button
          onPress={this.elimina}
          style={{marginTop: 10, width: "90%", marginHorizontal: "5%"}}
          mode="contained">
          Eliminar
        </Button>

      </View>
    )
  }

}
const styles = StyleSheet.create({
  errorMessage: {
    width: "90%",
    color: "red",
    marginHorizontal: "10%",
  }
})
export default Baja;