import React from 'react';
import CheckList from '../screens/CheckList/CheckList'
import PuntosRevision from '../screens/PuntosRevision/PuntosRevision';
import camaran from '../screens/Cameras/Camera'
import { createStackNavigator } from '@react-navigation/stack';


const RootStack = createStackNavigator();

export default function AuthNav() {
//   const { user } = useContext(CONSTANTS.LoginContext);

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="CheckList"
        component={CheckList}
        options={{title: `CheckList` }}
      />
      <RootStack.Screen
        name="PuntosRevision"
        component={PuntosRevision}
        options={{title:`PuntosRevision` }}
      />
      <RootStack.Screen
        name="camara"
        component={camaran}
        options={{title:`camara` }}
      />
    </RootStack.Navigator>
  );
}
