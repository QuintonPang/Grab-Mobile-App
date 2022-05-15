import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {HomeScreen, RequestScreen} from '../screens'
const Stack = createNativeStackNavigator();

const StackNavigator = () =>{
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="homeScreen"
                component={HomeScreen}
                options={{headerShown:false}}
            />
             <Stack.Screen
                name="requestScreen"
                component={RequestScreen}
                options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}

export default StackNavigator