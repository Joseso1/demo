import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthNav from './authNav';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import salir from '../screens/Logout/Logout';

const Tab = createBottomTabNavigator();

export default function Nav()
{
return(
        <Tab.Navigator>
            <Tab.Screen
            name='Home'
            component={AuthNav}
            options={{
                tabBarLabel:'Home',
                tabBarIcon: ({color, size})=>(
                    <MaterialCommunityIcons name='home' color={color} size={30} />
                ),
                headerShown:false
            }}
            />
            <Tab.Screen
            name='logout'
            component={salir}
            options={{
                tabBarLabel:'Salir',
                tabBarIcon: ({color, size})=>(
                    <MaterialCommunityIcons name='logout' color={color} size={30} />
                ),
                headerShown:false
            }}
            />
        </Tab.Navigator>
);
}
