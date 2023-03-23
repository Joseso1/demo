import { createContext } from "react";
import { ApiManager } from "./ApiManager";

const AuthContext =createContext();

   export const GuardarRevision = async (data) =>{

    let formData = new FormData();
    formData.append('IdRevision', data.IdRevision);
    formData.append('IdPuntoRevicion', data.IdPuntoRevicion);
    formData.append('Eviden', data.Eviden);
    formData.append('idEmpresa', data.idEmpresa);
    formData.append('Comentario', data.Comentario);
    formData.append('idusuario', data.idusuario);
    formData.append('img', data.img);
      try
      {
        const result = await ApiManager(
          '/Mantenimiento/SubirImagen',{
            method:'POST',
            body:formData,
            headers:{
              Accept:'application/json',
              'content-type':'multipart/form-data',
            },
            data:formData,
          });
          return result;
      }
      catch(error)
      {
        return error.response.data
      } 
      
    };