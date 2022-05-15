import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import Map from '../components/Map'
import tw from 'twrnc'
import { SheetManager } from 'react-native-actions-sheet'
// import { getStatusBarHeight } from 'react-native-status-bar-height';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ChooseLocation from '../components/ChooseLocation'
import ChooseCar from '../components/ChooseCar'
import { useSelector } from 'react-redux'
import { reset } from '../redux/locationSlice'
import { useDispatch } from 'react-redux'
//import { useRealm, useQuery } from '../realm/app'
import realmContext from '../realm/app'

const RequestScreen = ({navigation}) => {

const { useRealm, useQuery } = realmContext
    const realm = useRealm()

  const [origin, setOrigin] = useState(null)
  const [destination, setDestination] = useState(null)
  const [isHailed, setIsHailed] = useState(false)

  const location  = useSelector(state=>state.location)
  const { user } = useSelector(state=>state.user)

  const dispatch = useDispatch()

  const handleReset = () =>{
        realm.write(()=>{
              // Find the order
              const order = (realm.objects("Order").filtered(`userId=oid(${user.id})`))[0];
              console.log("Order found with ID: ",order._id)
              // Delete the collection from the realm.
              realm.delete(order);
        })

      dispatch(reset());
      setOrigin(null)
      setDestination(null)
      setIsHailed(false)
  }

  useEffect(()=>{
    if(location.origin.latitude && location.origin.longitude) 
      setOrigin(location.origin)
    
    if(location.destination.latitude && location.destination.longitude)
      setDestination(location.destination)

    if(location.isHailed) setIsHailed(location.isHailed)
    // console.log(location)
  },[location])

  useEffect(()=>{
    if(origin&&destination&&!isHailed) {
      SheetManager.show('chooseCarSheet')
    }
  },[origin,destination])

  return (
    <View style={tw`h-full w-full`}>
      <View style={tw.style(`flex flex-col h-auto`,{/*marginTop:StatusBar.currentHeight*/})}>
        <View style={tw.style(`bg-white w-full flex flex-row px-4 py-4`)}>
          <View style={tw`flex flex-1`}>
            <Pressable onPress={()=>navigation.navigate('homeScreen')}>
              <AntDesign size={30} name="arrowleft" color="#000000"/>
            </Pressable>
          </View>
          <View style={tw`flex flex-row flex-10 justify-center`}>
            <Image 
              source={require('../../assets/blankProfilePic.jpg')}
              style={tw`w-8 h-8 mx-4`}
            />
            <Text style={tw`text-black text-3xl`}>
              User
            </Text>
          </View>
        </View>
        <View style={tw`flex flex-row w-full px-4 bg-white px-2`}>
          <Image
            source={require('../../assets/transit.png')}
          />
          <View style={tw`flex flex-col w-full justify-evenly items-start bg-white`}>
            <TouchableOpacity onPress={isHailed?null:()=>{SheetManager.show('chooseLocationSheet',{sheet:'from'})}} style={tw.style('bg-gray-200 h-8 w-88 mb-4 rounded-3xl flex flex-col justify-center')}>
              <Text style={tw`px-2`}>{(origin&&origin?.name!=="")?origin.name:'From...'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={isHailed?null:()=>{SheetManager.show('chooseLocationSheet',{sheet:'destination'})}} style={tw.style('bg-gray-200 h-8 w-88 rounded-3xl flex flex-col justify-center')}>
              <Text style={tw`px-2`}>{(destination&&destination?.name!=="")?destination.name:'To...'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Map origin={origin} destination={destination}/>
      <ChooseLocation/>
      <ChooseCar/>
      {isHailed&&
      <View style={tw`absolute bottom-0 h-auto p-4 w-full justify-center items-center`}>
        <Pressable
          onPress={handleReset}
          style={({pressed})=>
              tw.style(`w-full p-4 h-full flex flex-row justify-center items-center`,
                  pressed?
                  `bg-red-300`:
                  `bg-red-500`,
              )     
          }
>
          <Text style={tw`text-white text-xl`}>CANCEL</Text>
        </Pressable>
        </View>}
    </View>
  )
}

export default RequestScreen

const styles = StyleSheet.create({})