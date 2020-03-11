import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Alert } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import Ajax from '../utils/Ajax'

class Alta extends Component{
  static navigationOptions={
    title:"Altas",
    headerStyle:{
      backgroundColor:"#4287f5",
    }
  };
  state={
    codigo:"",
    nombre:"",
    carrera:"",
    centro:"",

    // Errores
    codigoErrors: [],
    nombreErrors: [],
    carreraErrors: [],
    centroErrors: [],

    loading: false,
  }
  cambiacodigo=(inputText)=>{
    this.setState({codigo:inputText})
  }
  cambianombre=(inputText)=>{
    this.setState({nombre:inputText})
  }
  cambiacarrera=(inputText)=>{
    this.setState({carrera:inputText})
  }
  cambiacentro=(inputText)=>{
    this.setState({centro:inputText})
  }

  clean() {
    this.setState({codigo: ''});
    this.setState({nombre: ''});
    this.setState({carrera: ''});
    this.setState({centro: ''});
    // Reset errores
    this.cleanErrors();
  }

  cleanErrors() {
    this.setState({codigoErrors: []});
    this.setState({nombreErrors: []});
    this.setState({carreraErrors: []});
    this.setState({centroErrors: []});
  }
  
  salva=()=>{
    this.cleanErrors();
    this.setState({loading: true});
    Ajax.get('https://prograwebphp.000webhostapp.com/insertar', {
      Codigo: this.state.codigo,
      Nombre: this.state.nombre,
      Carrera: this.state.carrera,
      Centro: this.state.centro,
    })
    .then(response => {
      this.clean()
      alert(response.data.message);
    })
    .catch(error => {
      this.setState({codigoErrors: error.response.data.Codigo});
      this.setState({nombreErrors: error.response.data.Nombre});
      this.setState({carreraErrors: error.response.data.Carrera});
      this.setState({centroErrors: error.response.data.Centro});
    })
    .finally(() => this.setState({loading: false}));
  }
   
  render(){
    return(
      <View>
        <Text style={[{width: "100%",margin: 10,height: 30,fontSize:20,color: "purple"}]}>Altas</Text>

        <TextInput
          label="Codigo"
          mode="outlined"
          style={{width: "90%", marginHorizontal: "5%"}}
          onChangeText={codigo => this.setState({codigo})}
          value={this.state.codigo}
          />
        {
          this.state.codigoErrors.map((message, index) => {
            return <Text key={message} style={styles.errorMessage}>{ message }</Text>;
          })
        }

        <TextInput
          label="Nombre"
          mode="outlined"
          style={{width: "90%", marginHorizontal: "5%"}}
          onChangeText={nombre => this.setState({nombre})}
          value={this.state.nombre}
          />
        {
          this.state.nombreErrors.map((message, index) => {
            return <Text key={message} style={styles.errorMessage}>{ message }</Text>;
          })
        }

        <TextInput
          label="Carrera"
          mode="outlined"
          style={{width: "90%", marginHorizontal: "5%"}}
          onChangeText={carrera => this.setState({carrera})}
          value={this.state.carrera}
          />
        {
          this.state.carreraErrors.map((message, index) => {
            return <Text key={message} style={styles.errorMessage}>{ message }</Text>;
          })
        }

        <TextInput
          label="Centro"
          mode="outlined"
          style={{width: "90%", marginHorizontal: "5%"}}
          onChangeText={centro => this.setState({centro})}
          value={this.state.centro}
          />
        {
          this.state.centroErrors.map((message, index) => {
            return <Text key={message} style={styles.errorMessage}>{ message }</Text>;
          })
        }

        <Button onPress={this.salva} mode="contained" style={{marginTop: 10}} loading={this.state.loading}>
          Guardar
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
export default Alta;