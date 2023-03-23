import React,{ useEffect, useState,useRef, useCallback } from 'react';
import {View, Text,FlatList,StyleSheet,SafeAreaView,TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PuntosRevisiones } from '../../services/PuntosServices';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../Cameras/components/Botton';
const ENDPOINT = 'http://74.208.32.103/ApiSpl/api/Mantenimiento/GetPuntosEvidencia';
import {CerrarRevision} from '../../services/CerrarRevision';

export default function ListPreguntas({navigation}) {

  const [Puntos , setPuntos] =useState([]);
  const [Empresa , setEmpresa]= useState([""]);
  const [TipoUnidad , setIdTipoUnidad]= useState([""]);
  const [Unidad , setUnidad]= useState([""]);
  const [TipoRevision , setTipoRevision]= useState([""]);
  const [IdRevision , setRevision]= useState([""]);
  const [data , setData]= useState([]); 
  const [Contador,setContador] = React.useState(0);
  
  retrieveData = () => {
    try {
      AsyncStorage.getItem('IdTipoUnidad', (err, value) => {
        if (err) {
            console.log(err)
        } else {
          setIdTipoUnidad(JSON.parse(value)) // boolean false
        }
        })

        AsyncStorage.getItem('IdRevision', (err, value) => {
          if (err) {
              console.log(err)
          } else {
            setRevision(JSON.parse(value)) // boolean false
          }
          })

          AsyncStorage.getItem('IdEquipo', (err, value) => {
            if (err) {
                console.log(err)
            } else {
              setUnidad(JSON.parse(value)) // boolean false
            }
            })

            AsyncStorage.getItem('IdTipoRevision', (err, value) => {
              if (err) {
                  console.log(err)
              } else {
                setTipoRevision(JSON.parse(value)) // boolean false
              }
              })

    } catch (error) {
      console.log(error);
    }
  };
  removeData = () => {
    try {

      AsyncStorage.removeItem('IdTipoUnidad')
      AsyncStorage.removeItem('IdRevision')
      AsyncStorage.removeItem('IdEquipo')
      AsyncStorage.removeItem('IdTipoRevision')

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    
    (async () => {
        let IdTipoUnidad   =await AsyncStorage.getItem('IdTipoUnidad');
        let IdRevision     =await AsyncStorage.getItem('IdRevision');
        let IdEquipo       =await AsyncStorage.getItem('IdEquipo');
        let IdTipoRevision =await AsyncStorage.getItem('IdTipoRevision');
        setRevision(IdRevision);
        console.log(IdTipoUnidad);
        console.log(IdRevision);
        console.log(IdEquipo);
        console.log(IdTipoRevision);

      let data = await fetch(`${ENDPOINT}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({  IdTipoEquipo   : IdTipoUnidad, 
                                IdTipoRevision : IdTipoRevision,
                                IdEquipo       : IdEquipo,
                                IdEmpresa      : 1}),
        redirect: 'follow'})

        const result = await data.json();
        if(result.length > 0 ){
            setData(result);
            
        }
    })();

  },[])

  const ConsultaUnidades=()=>
  {
            PuntosRevisiones({    
            IdTipoEquipo   : TipoUnidad, 
            IdTipoRevision : TipoRevision,
            IdEquipo       : Unidad,
            IdEmpresa      : 1,
            }).then((result)=>{
              if(result.status==200)
              {
              
                let newArray =result.data.map((item) => {
                  return {idPunto:item.idPunto, DescripcionPunto: item.DescripcionPunto, Descripcion:item.Descripcion,IdtipoRevision:item.IdTipoRevision}
                })

                setPuntos(newArray);
              }
              else
              {
                console.log(result);
              }
            }).catch(err=>
              {
                console.error(err)
            })
  }

const Camara=(IdPunto)=>{
  
  AsyncStorage.setItem('IdPunto',JSON.stringify(IdPunto));

  navigation.navigate('camara');
}

const cerrar =()=>{

  console.log(IdRevision);
  CerrarRevision({    
    IdRevision : IdRevision,
    IdEmpresa:1
    }).then((result)=>{
      if(result.status==200)
      {
        removeData();
        navigation.push('CheckList');
      }
      else
      {
        console.log(result);
      }
    }).catch(err=>
      {
        console.error(err)
    })
}



    _renderItem = ({ item }) => {
        return (
          <SafeAreaView style={styles.container}>
            <Text style={styles.TextPrincipal}>Punto de revision: </Text><Text>{item.idPunto}         </Text>
            <Text style={styles.TextPrincipal}>Caracteristica:    </Text><Text>{item.DescripcionPunto}</Text>
            <Text style={styles.TextPrincipal}>Tipo de revision:  </Text><Text>{item.Descripcion}     </Text>
            <Text style={styles.TextPrincipal}>Cantidad de evidencias:</Text>
            <TouchableOpacity onPress={()=>Camara(item.idPunto)}>
              <MaterialCommunityIcons name='camera-enhance' color={'#3ebd93'} size={35}/>
            </TouchableOpacity>

          </SafeAreaView>
        );
    };
    
  return (
    <View>
      <ScrollView>
        <FlatList 
          data={data}
          renderItem={this._renderItem}
        />
        <View style={styles.boton}>
        <Button title={'Enviar reporte'} OnPress={()=>cerrar()}></Button>
        </View>
        </ScrollView>
      </View>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:45,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    marginLeft:20,
    marginBottom:20
  },
  TextPrincipal:{
    fontSize:15,
    color:'#000',
    fontWeight:'bold',
  },checkbox: {
    alignSelf: 'center',
  },containerRow:{
    flexDirection:'row',
    justifyContent:'center'
  },
  textocheck:{
    marginTop:8,
  },boton:{
    backgroundColor:'#008000',
  }
});
