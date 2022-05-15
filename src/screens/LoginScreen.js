import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, {useState} from 'react'
import tw from 'twrnc'
import Realm from 'realm'
import { appConfig } from '../realm/app'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'

const LoginScreen = () => {



  const [username, setUsername] = useState(null)
  const dispatch = useDispatch()

  const handleLogin = async () =>{
      try{
          const app = new Realm.App(appConfig)
          const credentials = Realm.Credentials.anonymous()
          const user = await app.logIn(credentials)

          // user is non-enumerable in this case,
          // only properties such as id can be printed out
//        console.log(user.id)
          await dispatch(setUser({user,username}))
          //setUser(await app.logIn(credentials))
      }catch(err){
         console.log('Error logging in!')
         console.log(err)
      }
  }

  return (
    <View style={tw`w-full h-full items-center justify-center`}>
        <TextInput
            style={tw.style(`m-4 rounded-3xl h-8 w-70 p-2`,{borderStyle:'solid',borderColor:"black",borderWidth:2})}
            placeholder="Username"
            value={username} onChangeText={(text)=>setUsername(text)}
        />
        <Pressable style={tw.style(`p-2 rounded-md`,{borderWidth:2,borderColor:'#000000',borderStyle:'solid'})}onPress={handleLogin}>
          <Text>
            LOGIN
          </Text>
        </Pressable>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})