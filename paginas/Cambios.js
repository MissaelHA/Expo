import React, { Component } from "react";
import { StyleSheet, SafeAreaView, Text, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Estudiante from '../components/Estudiante';
import Constants from 'expo-constants';
import Ajax from '../utils/Ajax';

export default class Cambios extends Component{
  static navigationOptions={
    title:"Cambios",
    headerStyle:{
      backgroundColor:"#4287f5",
    }
  };

  constructor(props) {
    super(props);
    this.state={
      estudiantes: [],
      loading: true,
    }
    this.loadStudents();
  }

  loadStudents() {
    Ajax.get('https://prograwebphp.000webhostapp.com/consulta', {})
    .then(response => {
      this.setState({estudiantes: response.data});
    })
    .catch(error => {
      alert(error.response.data.message);
    })
    .finally(() => this.setState({loading: false}));
  }

  render(){
    return(
      <SafeAreaView style={styles.container}>

        <ScrollView>
          {this.state.loading &&
            <Text style={{textAlign: "center", color: "purple", width: '100%'}}>Cargando...</Text>
          }

          {!this.state.loading &&
            <Text style={{width: "100%",margin: 10,height: 30,fontSize:20,color: "purple"}}>Cambios</Text>
          }
          {
            this.state.estudiantes.map((estudiante, index) => {
              return <Estudiante key={index} navigation={this.props.navigation} style={styles.card} estudiante={estudiante} />;
            })
          }
        </ScrollView>

      </SafeAreaView>
    )
  }

}
const styles = StyleSheet.create({
  card: {
    width: "90%",
    marginHorizontal: "5%",
    marginTop: 20,
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    paddingBottom: 20,
  },
})