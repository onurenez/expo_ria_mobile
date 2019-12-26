import * as React from 'react';
import { Text} from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios'; 
import { createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'

import Login from'./Login';
import Product from './Product';
import Detail from './Detail';

const stack = createStackNavigator({
  login : {screen: Login},
  product:{screen: Product},
  detail:{screen: Detail}
});

export default createAppContainer(stack);


