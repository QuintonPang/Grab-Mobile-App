import React, { useState, useEffect } from 'react'
import {
  StatusBar,
  Text, 
  View, 
  Pressable, 
  Dimensions, 
  Image, 
  TextInput,
  FlatList,
  ScrollView,
  // StyleSheet,
} from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather'; ;
import AntDesign from 'react-native-vector-icons/AntDesign'; ;
import tw from 'twrnc'
// import { getStatusBarHeight } from 'react-native-status-bar-height';
import { filterData, rideData } from '../global/data'
import realmContext from '../realm/app'
import Map from '../components/Map';
import { useSelector } from 'react-redux'
import Realm from 'realm'

const HomeScreen = ({navigation}) => {
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  // const statusBarHeight = getStatusBarHeight()
  const statusBarHeight = StatusBar.currentHeight;

  const [input, setInput] = useState('')
  const [pressedButton, setPressedButton] = useState(false)

  const { useRealm } = realmContext
  const realm = useRealm()
  const user = useSelector(state=>state.user)

  // record current user in realm if not found in realm
  useEffect(()=>{

       let userFound = (realm.objects("User").filtered(`_id=oid(${user.user.id})`))[0];
     if(!userFound){
         realm.write(()=>{
                let userCreated = realm.create('User',{
                    _id: new Realm.BSON.ObjectID(user.user.id),
                    _partition: user.user.id,
                    username: user.username,
                  })
     })
    }
  },[])

  const handleInput = (text) =>{
    setInput(text)
  }

  return (
      <View style={tw.style(`flex flex-col justify-between`,{width:screenWidth, height:screenHeight, marginTop:0})}>
          <View style={tw.style(`bg-green-500 w-full flex flex-row px-4 py-4`,{height:screenHeight*0.1})}>
              <Pressable onPress={()=>navigation.openDrawer()}>
                <Entypo size={30} name="menu" color="#ebdede"/>
              </Pressable>
          </View>
          <View style={tw.style(``,{width:screenWidth,height:screenHeight*0.9})}>
            <ScrollView
              bounces={false}
              persistentScrollbar={true}
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={tw`bg-green-500 w-full flex flex-col px-4 py-4 h-44 justify-between`}>
                  <View style={tw`flex flex-row w-full justify-start`}>
                    <Text style={tw`text-white text-3xl font-bold`}>GRAB</Text>
                    <AntDesign name='car' style={tw`mx-4 top-1`} color='white' size={25}/>
                  </View>
                  <View>
                    <Text style={tw`text-white text-sm`}>Tired of driving? Let us handle it!</Text>
                  </View>
                  <View style={tw`self-center`}>
                    <Pressable onPressIn={()=>{setPressedButton(true);navigation.navigate('requestScreen')}} onPressOut={()=>{setPressedButton(false)}} style={tw.style(`bg-black rounded-3xl px-8 py-4`,pressedButton&&`bg-white`)}>
                      <Text style={tw.style(`text-white`,pressedButton&&`text-black`)}>Ride with GrabCar</Text>
                    </Pressable>
                  </View>
              </View>
              {/* <View style={tw.style(``)}> */}
                {/* <View style={tw`flex flex-col justify-evenly h-20 items-center`}>
                  <Image
                    style={tw``}
                    source={require('../../assets/ride.png')}
                  />
                  <Text>
                    Ride
                  </Text>
                </View> */}
                {/* <FlatList
                  ItemSeparatorComponent={
                    (({ highlighted }) => (
                      <View
                        style={tw`m-5`}
                      />
                    ))
                  }
                style={tw.style(`mx-10 my-8 h-20`,{width:screenWidth})}
                horizontal={true}
                data={filterData}
                renderItem={({item})=>
                  <View style={tw`flex flex-col justify-evenly h-20 items-center`}>
                    <Image
                      style={tw``}
                      source={item.image}
                    />
                    <Text>
                      {item.name}
                    </Text>
                </View>}
                keyExtractor={item => item.id}
              /> */}
                {/* </View> */}
              <View style={tw`flex flex-row justify-evenly h-20 items-center my-8`}>
                {filterData.map((item)=>
                  <View key={item.id} style={tw`flex flex-col justify-evenly h-20 items-center`}>
                    <Image
                      style={tw``}
                      source={item.image}
                    />
                    <Text>
                      {item.name}
                    </Text>
                  </View>
                )}
              </View>
              <View style={tw`self-center flex flex-row w-100 mx-6 justify-center items-center`}>
                <TextInput
                  style={tw.style(`rounded-3xl h-8 w-70 p-2`,{borderStyle:'solid',borderColor:"black",borderWidth:2})}
                  placeholder="Choose your desination"
                  value={input} onChangeText={(text)=>handleInput(text)}
                />
                <View style={tw`w-20 h-8 flex flex-row items-center justify-center bg-gray-100 mx-1 rounded-3xl`}>
                  <Feather
                    name='clock'
                    size={20}
                    style={tw`mx-2`}
                  />
                  <Text>Now</Text>
                </View>
              </View>
              <View style={tw`h-80 mx-2 flex flex-col items-center`}>
                {/* <FlatList
                  persistentScrollbar={true}
                  showsVerticalScrollIndicator={true}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={
                    (({ highlighted }) => (
                      <View
                        style={tw`h-1 bg-gray-100`}
                      />
                    ))
                  }
                  style={tw.style(`my-8 h-20`,{width:screenWidth-10})}
                  horizontal={false}
                  data={rideData}
                  renderItem={({item})=>
                    <View style={tw`flex flex-row justify-start h-20 items-center bg-gray-200 p-3`}>
                      <Entypo name='location-pin' size={20}/>
                      <Text style={tw`font-bold text-lg mx-4`}>{item.street},{item.area}</Text>
                  </View>}
                  keyExtractor={item => item.id}
                  /> */}
                <ScrollView
                  nestedScrollEnabled
                  persistentScrollbar={true}
                  showsVerticalScrollIndicator={true}
                  showsHorizontalScrollIndicator={false}
                  style={tw.style(`mt-8 mb-4 h-full`,{width:screenWidth-10})}
                >

                  {rideData.map((item)=>
                    <View key={item.id} style={tw.style(`flex flex-row justify-start h-20 items-center bg-green-500 p-3`,{borderStyle:'solid',borderColor:'green',borderWidth:1})}>
                      <Entypo name='location-pin' size={20} color='red'/>
                      <Text style={tw`font-bold text-white text-sm mx-4`}>{item.street},{item.area}</Text>
                    </View>
                  )}

                </ScrollView>

              </View>
              <View style={tw`w-full h-full p-2`}>
                <Text style={tw`text-black text-2xl mb-4`}>
                  GrabCars Around You
                </Text>
                <View style={tw`h-100 w-full`}>
                  <Map origin={null} destination={null}/>
                </View>
              </View>
            </ScrollView>
          </View>
      </View>
  )
}

export default HomeScreen

