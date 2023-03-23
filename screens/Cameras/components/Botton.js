 import * as React from 'react';
 import { Text, TouchableOpacity, StyleSheet } from 'react-native';
 import { MaterialCommunityIcons } from '@expo/vector-icons';

 export default function Button({title,OnPress,icon,color}){
    return(
        <TouchableOpacity onPress={OnPress} style={styles.button}>
            <MaterialCommunityIcons name={icon} size={28} color={color? color:'#f1f1f1'} / >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
 }

 const styles = StyleSheet.create({
    button:{
        height:40,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50
    },
    text:{
        fontWeight :'bold',
        fontSize :16,
        color:'#FFFFFF',
        marginLeft:10,
        alignItems:'stretch',
    }
 })