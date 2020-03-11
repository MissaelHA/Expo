import React, { Component } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import Ajax from '../utils/Ajax';

class Form extends Component
{
  static navigationOptions = {
    title:"Modificacion",
    headerStyle:{
      backgroundColor:"#4287f5",
    }
  };
  
  constructor(props) {
    super(props);
    this.setData(props.navigation.state.params.estudiante);
  }

  setData = (data) => {
    this.state = {
      loading: false,
      oldCodigo: data.Codigo,

      codigo: data.Codigo,
      nombre: data.Nombre,
      carrera: data.Carrera,
      centro: data.Centro,

      codigoErrors: [],
      nombreErrors: [],
      carreraErrors: [],
      centroErrors: [],
    };
  };

  actualiza = () => {
    this.cleanErrors();
    this.setState({loading: true});
    
    const estudiante = this.props.navigation.state.params.estudiante;
    let form = {OldCodigo: this.state.oldCodigo};
    if(this.state.codigo != estudiante.Codigo) form.Codigo = this.state.codigo;
    if(this.state.nombre != estudiante.Nombre) form.Nombre = this.state.nombre;
    if(this.state.carrera != estudiante.Carrera) form.Carrera = this.state.carrera;
    if(this.state.centro != estudiante.Centro) form.Centro = this.state.centro;

    Ajax.get('https://prograwebphp.000webhostapp.com/modificar', form)
    .then(response => {
      this.clean()
      alert(response.data.message);
      this.props.navigation.popToTop();
    })
    .catch(error => {
      this.setState({
        codigoErrors: error.response.data.Codigo || [],
        nombreErrors: error.response.data.Nombre || [],
        carreraErrors: error.response.data.Carrera || [],
        centroErrors: error.response.data.Centro || []
      });
    })
    .finally(() => this.setState({loading: false}));
  }
  
  clean = () => {
    this.setState({
      oldCodigo: '',
      codigo: '',
      nombre: '',
      carrera: '',
      centro: '',
    });
  }

  cleanErrors = () => {
    this.setState({
      codigoErrors: [],
      nombreErrors: [],
      carreraErrors: [],
      centroErrors: []
    });
  }

  render() {
    return (
      <View>
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
          onChangeText={carrera => this.setState({carrera: carrera.toUpperCase()})}
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
          onChangeText={centro => this.setState({centro: centro.toUpperCase()})}
          value={this.state.centro}
          />
        {
          this.state.centroErrors.map((message, index) => {
            return <Text key={message} style={styles.errorMessage}>{ message }</Text>;
          })
        }

        <Button onPress={this.actualiza} mode="contained" style={{marginTop: 10}} loading={this.state.loading}>
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
    marginHorizontal: "5%",
  }
});

export default Form;
