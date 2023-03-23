import React, { Component, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useContext } from 'react';
import * as CONSTANTS from '../../App';

export default function LogOutScreen({ navigation }) {
  const { user, setUser } = useContext(CONSTANTS.LoginContext);

  const LogOut = () =>{
    setUser(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cerrar sesion de {user} </Text>
     
      <Button
              buttonStyle={{
                width:150,
                height:50,
                borderRadius:25,
                padding:15,
                marginTop:10,
              }}
              titleStyle={{
                color: '#000909',
              }}
              onPress={() => {LogOut()}}
              title="Cerrar Sesion"
            />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 71, 0.5)',
    alignItems: 'center',
    justifyContent:"center"
  },
  title: {
    color: 'white',
    fontSize:20,
  },
});