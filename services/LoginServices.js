import { createContext } from "react";
import { ApiManager } from "./ApiManager";

const AuthContext =createContext();

   export const user_login = async data =>{
      try
      {
        const result = await ApiManager(
          '/Login/authenticate',{
            method:'POST',
            headers:{
              'content-type':'application/json',
            },
            data:data,
          });
          return result;
      }
      catch(error)
      {
        return error.response.data
      } 
   
    };
      
