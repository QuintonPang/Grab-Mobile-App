import { StatusBar } from 'expo-status-bar';
// import { Text, View } from 'react-native';
import RootNavigator from './src/navigations/RootNavigator';
// import { HomeScreen } from './src/screens'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import React, { useState } from 'react'
import { LoginScreen } from './src/screens';
//import { RealmProvider } from './src/realm/app'
import realmContext from './src/realm/app'
//import { OrderSchema, UserSchema, DestinationSchema, OriginSchema } from './src/realm/schemas'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { ActivityIndicator, View, Text } from 'react-native'
import tw from 'twrnc'

export default function App() {

  // const [user, setUser] = useState('')

  const { user } = useSelector(state=>state.user)
    const { RealmProvider } = realmContext
  useEffect(()=>{
    console.log("Current logged in user id:",user?.id)
  },[user])

  return (

    <>
      {!user?
        <LoginScreen/>
      :
      <RealmProvider
        sync={{user:user,partitionValue:user.id}}  // partition is used to identify who to read and write which document
        fallback={ // components to be rendered when opening realm
            <View style={tw`w-full h-full justify-center items-center`}>
                <ActivityIndicator size='large' color='#00dc00'/>
                <Text style={tw`text-sm text-green-500 mt-2`}>
                    We are logging you in...
                </Text>
            </View>
            }
      >
        <RootNavigator/>
      </RealmProvider>
      }
    </>

  );
}

// const styles = StyleSheet.create({

// });
