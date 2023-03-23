import { useState, createContext,} from 'react';
import Nav from './CheckListApp/navigation/nav';
import GenNav from './CheckListApp/navigation/getNav';
//Dependencies

import { NavigationContainer } from '@react-navigation/native';
export const LoginContext = createContext();

export default function App() {
 const [user, setUser] = useState('');

  return (
    <NavigationContainer>
      <LoginContext.Provider value={{ setUser: setUser, user }} >
      {
      user ? 
      <Nav/>
      :
      <GenNav/>
      }
      </LoginContext.Provider>
    </NavigationContainer>
  );
}



