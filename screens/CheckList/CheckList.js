import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { CargarUnidades } from '../../services/CkecklistServices';
import { CargarRevisiones } from '../../services/Revisiones';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Boton from '../Cameras/components/Botton';
import { CrearRevision } from '../../services/NuevaRevision';


export default function CheckList({navigation}) {
    
    const [Empresa , setEmpresa]= React.useState([""]);
    const [TipoUnidad , setTipoUnidad]= React.useState([""]);
    const [Unidad , setUnidad]= React.useState([""]);
    const [TipoRevision , setTipoRevision]= React.useState([""]);
    const [Unidades , setUnidades] =React.useState([]);
    const [Revisiones , setRevisiones] =React.useState([]);

    const Empresas =[
        {key:1,value:'NYC'},
        {key:2,value:'NMX'},
        {key:3,value:'TUNL'},
        {key:3,value:'TYASSA'},
        {key:3,value:'FLETES3H'},
    ];
    const TipoUnidads =[
        {key:1,value:'TRACTO'},   
        {key:2,value:'REMOLQUE'},
        {key:3,value:'DOLLY'},
    ];

    useEffect(()=>{
      ConsultaUnidades()
    },[])
  
const ConsultaUnidades=()=>
{
          CargarUnidades({    
          IdTipoEquipo : TipoUnidad, 
          IdEmpresa : 1
          }).then((result)=>{
            if(result.status==200)
            {
              let newArray =result.data.Table.map((item) => {
                return {key:item.IdEquipo, value: item.ClaveUnidad}
              })

              setUnidades(newArray);
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

const ConsultaRevision=()=>
{
          CargarRevisiones({    
          IdTipoEquipo : TipoUnidad, 
          IdEquipo : Unidad,
          IdEmpresa : 1
          }).then((result)=>{
            if(result.status==200)
            {
              let Array =result.data.Table.map((item) => {
                return {key:item.idTipoRevision, value: item.Descripcion}
              })
              setRevisiones(Array);
              console.log(Array)
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

const GuardarRevision=()=>
{
  CrearRevision({    
    IdTipoRevision : TipoRevision, 
    IdEquipo : Unidad,
    IdTipoEquipo : TipoUnidad,
    EstatusRevision:'NUEVA',
    IdUsuario: 1,
    IdEmpresa:Empresa
    }).then((result)=>{
      if(result.status==200)
      {
        
        let rev = result.data;

        AsyncStorage.setItem('IdRevision',JSON.stringify(rev[0]['IdRegistro']));
        AsyncStorage.setItem('IdTipoUnidad',JSON.stringify(TipoUnidad))
        AsyncStorage.setItem('IdEquipo',JSON.stringify(TipoUnidad))  
        AsyncStorage.setItem('IdTipoRevision',JSON.stringify(TipoRevision))

        console.log(JSON.stringify(rev[0]['IdRegistro']));
        console.log(JSON.stringify(TipoUnidad));
        console.log(JSON.stringify(TipoUnidad));
        console.log(JSON.stringify(TipoRevision));

        navigation.navigate('PuntosRevision');

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


  return (

    <View style={styles.container}>

    <Text style={styles.subTitle}>Selecciona la unidad que se le hara revision</Text>
    
    <Text style={styles.subTitle}>Empresa :</Text>
    <SelectList  style={styles.comboBox}
    setSelected={(val)=>setEmpresa(val)}
    data={Empresas}
    placeholder={'Selecciona Empresa'}
    defaultOption ={{key:'1',value:'NYC'}}
     />

    <Text style={styles.subTitle}>Tipo de unidad :</Text>
    <SelectList 
    style={styles.comboBox}
    data={TipoUnidads}
    placeholder={'Selecciona tipo de unidad'}
    setSelected={(val)=>setTipoUnidad(val)}
    onSelect={()=>(ConsultaUnidades())}
    />

    <Text style={styles.subTitle}>Unidad :</Text>
    <SelectList 
    style={styles.comboBox}
    setSelected={(val)=>setUnidad(val)}
    data={Unidades}
    onSelect={()=>{ConsultaRevision()}}
    placeholder={'Selecciona unidad'}
    />
   
    <Text style={styles.subTitle}>Tipo de revision :</Text>

    <SelectList 
    setSelected={setTipoRevision}
    data={Revisiones}
    placeholder={'Selecciona revision'}
    />

    <StatusBar style="auto" />
    <View
    style={{
      flexDirection:'row',
      justifyContent:'space-between',
      paddingHorizontal :50,
      backgroundColor:'#008000',
      marginTop:50,
      }}
    >
        <Boton title={'Nueva'} icon='clipboard-list' OnPress={GuardarRevision}/>
        <Boton title={'Cancelar'} icon='cancel' />
    </View>
    

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
  },

  titulo:{
    fontSize:30,
    color:"#000",
    fontWeight:'bold'
  },

  subTitle:{
    fontSize:20,
    color:"#000",
    fontWeight:'bold',
    padding:8
  },
  comboBox:{
    borderWidth:1,
    borderColor:'black',
    padding:10,
    width:'80%',
    marginTop:35,
    borderRadius:30,
    height:50,
    backgroundColor:'#fff',
    paddingStart:20,
    flex: 1,
    width:80,
  },
  button:
  {
    width:200,
    height:50,
    borderRadius:30,
    borderColor:'gray',
    borderWidth:1,
    marginTop:20,
    alignItems:'center',
    padding:5,
    
  },
  textButton:
  {
    fontSize:20,
    color:"#fff",
    fontWeight:'bold',
    alignItems:'center'
  }
});
