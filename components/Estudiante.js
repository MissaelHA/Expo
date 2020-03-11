import React, { Component } from 'react';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

export default class Estuadiante extends Component
{
  render() {
    return (
      <Card style={[{borderRadius: 5}, this.props.style]}>
        <Card.Content>
          <Title>{ this.props.estudiante.Nombre }</Title>
          <Paragraph>Codigo: { this.props.estudiante.Codigo }</Paragraph>
          <Paragraph>Carrera: { this.props.estudiante.Carrera }</Paragraph>
          <Paragraph>Centro: { this.props.estudiante.Centro }</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            style={{width: "100%"}}
            mode="outlined"
            onPress={
              () => this.props.navigation.navigate("Form", {estudiante: this.props.estudiante})
            }>Modificar</Button>
        </Card.Actions>
      </Card>
    );
  }
}