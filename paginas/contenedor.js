import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import MenuPage from './menu'; 
import AltaPage from './altas';
import BajaPage from './bajas';
import Cambios from './Cambios';
import Form from './Form';

const NavigationStack = createStackNavigator({
  Menu: {
    screen: MenuPage,
  },
  Altas: {
    screen: AltaPage,
  },
  Bajas: {
    screen: BajaPage,
  },
  Cambios: {
    screen: Cambios,
  },
  Form: {
    screen: Form
  }
});

const Container = createAppContainer(NavigationStack);
export default Container;