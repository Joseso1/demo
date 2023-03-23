import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,TextInput, TouchableOpacity, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SelectList } from 'react-native-dropdown-select-list';
import { useState,useCallback, useContext } from 'react';
import { user_login } from '../../services/LoginServices'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as CONSTANTS from '../../App';



export default function LoginForm({navigation}) {

  const [Empresa , setEmpresa]=   useState(null);
  const [UserName , setUserName]= useState(null);
  const [Password , setPassword]= useState(null);
 const { setUser } = useContext(CONSTANTS.LoginContext);

  const Empresas =[
    {key:'1',value:'NYC'},
    {key:'2',value:'NMX'},
    {key:'3',value:'TUNL'},
    {key:'4',value:'TYASSA'},
    {key:'5',value:'FLETES3H'},
];


const handleLogin=()=>
{
 

        user_login({    
          UserName : UserName, 
          Password : Password,
          IdEmpresa: Empresa,
          }).then((result)=>{
            if(result.status==200)
            {
              let a = result.data;
              AsyncStorage.setItem('token',a.Token);
              AsyncStorage.setItem('Name',a.Name) ;
              AsyncStorage.setItem('UserName',UserName);
              AsyncStorage.setItem('IdEmpresa',Empresa);
              console.log('si llega mi usuariio');
              console.log(UserName);
              setUser(UserName);
              
            }
            else
            {
              console.log("Usuario no valido");
              Alert.alert('','Usuario o contraseña invalida');
            }
          }).catch(err=>
            {
              console.error(err)
          })
}


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Checklist de Unidades</Text>
      <Text style={styles.subTitle}>Grupo Nor y Caribe</Text>

      <TextInput
      placeholder='Numero de empleado'
      style={styles.textInput}
      value={UserName}
      onChangeText = {text => setUserName(text)}
      />

      <TextInput
      placeholder='Contraseña'
      style={styles.textInput}
      secureTextEntry={true}
      value={Password}
      onChangeText = {text => setPassword(text)}
      />

    <Text style={styles.subTitle}>Empresa :</Text>

    <SelectList  style={styles.comboBox}
    setSelected={(val)=>setEmpresa(val)}
    data={Empresas}
    placeholder={'Selecciona Empresa'}
    defaultOption ={{key:'1',value:'NYC'}}
     />


    <TouchableOpacity onPress={handleLogin}>
      <LinearGradient
        // Button Linear Gradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        start={{x:0,y:0}}
        end={{x:1,y:1}}
        style={styles.button}
        >
        <Text style={styles.textButton}>Ingresar</Text>
      </LinearGradient>
    </TouchableOpacity>


      <StatusBar style="auto" />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
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
    marginTop:10,
  },
  textInput:{
    borderWidth:1,
    borderColor:'gray',
    padding:10,
    width:'80%',
    marginTop:20,
    borderRadius:30,
    height:50,
    backgroundColor:'#fff',
    paddingStart:20,
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
  },
  comboBox:{
    borderColor:'black',
    width:'100%',
    paddingTop:40,
    borderRadius:30,
    backgroundColor:'#fff',
    paddingStart:20,
    flex: 1,
    marginHorizontal: 10
  },
});
