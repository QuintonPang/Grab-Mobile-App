import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigator from './DrawerNavigator';

export default RootNavigator = () =>{
    return(
    <NavigationContainer>
        <DrawerNavigator/>
    </NavigationContainer>
    )
}