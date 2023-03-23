import React from 'react';
import loginPage from '../screens/Login/LoginForm';
import { createStackNavigator } from '@react-navigation/stack';

const Gentack = createStackNavigator();

export default function GenNav() {
  return (
    <Gentack.Navigator>
      <Gentack.Screen
        name="Login"
        component={loginPage}
        options={{ headerShown: false }}
      />
    </Gentack.Navigator>
    
  );
}
