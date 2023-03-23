import * as React from 'react';
import {useState, useEffect,useRef} from 'react'
import {View ,Text,StyleSheet,Image, Alert} from 'react-native';
import { Camera, CameraType} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Boton from './components/Botton';
import { GuardarRevision } from '../../services/GuardarRevisiones';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PuntosRev({navigation}) {
  
    const[type,setType]= useState(Camera.Constants.Type.Back);
    const[hasPermission, setHasPermission]=useState(null);
    const[flash,setFlash]= useState(Camera.Constants.FlashMode.off);
    const[image,setImage] = useState(null);
    const cameraRef = useRef(null);

    
  const [IdRevision , setIdRevision] =useState([]);
  const [IdPuntoRevicion , setIdPuntoRevicion]= React.useState([""]);
 
  retrieveData = () => {
    try {
                
      AsyncStorage.getItem('IdRevision', (err, value) => {
        if (err) {
            console.log(err)
        } else {
            setIdRevision(JSON.parse(value)) // boolean false
            console.log(JSON.parse(value));
        }
        })

        AsyncStorage.getItem('IdPunto', (err, value) => {
          if (err) {
              console.log(err)
          } else {
            setIdPuntoRevicion(JSON.parse(value)) // boolean false
          }
          })


    } catch (error) {
      console.log(error);
    }
  };

    useEffect(()=>{
        (async()=> {
            MediaLibrary.requestPermissionsAsync();
            const {status}= await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })()
    },[])
    useEffect(()=>{
        retrieveData()
    },[])


    const SubirFoto= async (image)=>
    {
    
        console.log(IdRevision);
        console.log(IdPuntoRevicion);


        let img = {
            uri:image,
            type:'image/jpeg',
            name: 'demo.jpg'
        }
        GuardarRevision({ 
            IdRevision:IdRevision,
            IdPuntoRevicion:IdPuntoRevicion,
            Eviden:IdPuntoRevicion,
            idEmpresa:1,
            Comentario:'demo',
            idusuario:1,
            img: img
              }).then((result)=>{
                if(result.status==200)
                {
                
                    alert("Se guardo la imagen!!");
                    console.log(result);
                    navigation.navigate('PuntosRevision');
                    setImage(null);
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
  
    const takePicture = async ()=>
    {
        if(cameraRef)
        {
            try{
                const data = await cameraRef.current.takePictureAsync(options={base64:true,quality:0});
                
                setImage(data.uri);

            }
            catch(e){
                console.log(e);
            }
        }
    }

    const saveImage =()=>
    {   


        SubirFoto(image);
    }

    if(hasPermission=== null)
    {
        return <View></View>
    }
    else if(hasPermission===false)
    {
        return <Text>Acceso denegado</Text>

    }


    return(
        <View style={styles.container}>
        
        {!image ?
        <Camera 
        style={styles.camera}
        type={type}
        flashMode={flash}
        ref={cameraRef}
        >
            <View style={styles.Superiror}>
                <Boton icon={'camera-flip'} 
                       onPress={()=>{setType(type === CameraType.back ? CameraType.front : CameraType.back)}} />
                <Boton icon={'flash'} 
                       color={flash === Camera.Constants.FlashMode.off ? 'gray':'#f1f1f1'} onPress={()=>{setFlash(flash=== Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.flashMode.off)}}/>
            </View>
        </Camera>
        :
         <Image source={{uri:image}} style={styles.camera}/>
        }
            <View >
                {image ? 
                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    paddingHorizontal :50
                    }}>
                    <Boton title={'Volver a tomar'} icon='refresh' OnPress={() => setImage(null)}/>
                    <Boton title={'Guardar'} icon='check' OnPress={()=>saveImage()}/>
                </View>
                :
                <Boton title={'Capturar'} icon='camera' OnPress={takePicture} />
                }
            </View>
        </View>

    );

}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000',
        justifyContent:'center',
        paddingBottom:10,
        alignItems:'stretch',
        
    },
    camera:{
        flex:1,
        borderRadius:20,
    },
    Superiror:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:30,

    }
 })


