import { StyleSheet, Text, View, FlatList, Pressable, Dimensions, Image, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { carTypeData } from '../global/data'
import tw from 'twrnc'
import ActionSheet, { SheetManager } from 'react-native-actions-sheet'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setIsHailed } from '../redux/locationSlice'
//import { useRealm, useQuery } from '../realm/app'
import realmContext from '../realm/app'
import Realm from 'realm'

const ChooseCar = () => {

    const { useRealm, useQuery } = realmContext
    const realm = useRealm()
    const { data:order } = useQuery('Order')

    const dispatch = useDispatch() 
    const [carType, setCarType] = useState(null)
    const location = useSelector(state=>state.location)
    const { user:{id:userId} } = useSelector(state=>state.user)

    const handleOrder = async () =>{
    try{
            let orderCreated;
            console.log(location.destination,location.origin)
            dispatch(setIsHailed({isHailed:true}))
            realm.write(()=>{
                orderCreated = realm.create('Order',{
                    _id: new Realm.BSON.ObjectID(),
                    _partition: userId,
                    userId: new Realm.BSON.ObjectID(userId),
                    destination:location.destination,
                    origin:location.origin,
                    carType,
                })
            })
//            console.log("Order has been created with ID: ",orderCreated._id)
//            console.log(order)
//            console.log("Realm is stored at ",realm.path)
            await SheetManager.hide('chooseCarSheet')
            // alert(location.isHailed)
    }catch(err){
        console.log(err)
    }


    }
    

  return (
    <ActionSheet style={tw`flex flex-col items-center`} id="chooseCarSheet" >
        <View style={tw`w-full mt-4 flex flex-row justify-center`}>
            <MaterialCommunityIcons name='drag-horizontal-variant' size={30}/>
        </View>
        <ScrollView style={tw.style(`flex flex-col px-2 `,{height:Dimensions.get('window').height*0.6})}>
            <View style={tw.style(`flex flex-col justify-evenly p-2`)}>
                
                {carTypeData.map((item,i)=>
                    <View key={i} style={tw`flex flex-col`}>
                    <Text style={tw`text-3xl font-bold text-black m-4`}>
                        {item.title}
                    </Text>
                    {item.data.map((d)=>
                        <Pressable onPress={()=>setCarType(d.name)} key={d.id} style={({pressed})=>tw`flex flex-row w-full h-20 justify-center ${carType===d.name&&'bg-green-400'}`}>
                            <View style={tw`flex-1`}>
                                <Image
                                style={tw`h-full ml-1`}
                                resizeMode='contain'
                                source={d.image}
                                />
                            </View>
                            <View style={tw`flex-3 flex flex-col items-start justify-evenly`}>
                                <Text style={tw`text-3xl text-black font-bold`}>
                                    {d.name}
                                </Text>
                                <Text style={tw`text-sm text-gray-500`}>
                                    {d.time}
                                </Text>
                                <Text style={tw`text-sm text-gray-500`}>
                                    {d.note}
                                </Text>
                            </View>
                            <View style={tw`flex-1 flex-col `}>
                                {d.promotion>0?
                                (
                                    <>
                                        <Text style={tw`text-sm line-through text-gray-500`}>
                                            RM {d.price}
                                        </Text>
                                        <Text style={tw`text-sm text-black font-bold`}>
                                            RM {Number((d.price-d.promotion).toFixed(2))}
                                        </Text>     
                                    </>
                                ):
                                (
                                    <Text style={tw`text-sm text-black`}>
                                        {item.price}
                                    </Text>
                                )
                                }
                            </View>
                        </Pressable>
                    )}
                </View>
                )}
                
                {/* <FlatList
                    ItemSeparatorComponent={
                    (({ highlighted }) => (
                    <View
                        style={tw`m-5`}
                    />
                    ))
                    }
                    style={tw.style(`mx-10 my-8 h-20`,{width:Dimensions.get('window').width})}
                    horizontal={false}
                    data={carTypeData}
                    renderItem={({item})=>
                    <View style={tw`flex flex-col`}>
                        <Text style={tw`text-3xl font-bold text-black m-4`}>
                            {item.title}
                        </Text>
                        {item.data.map((d)=>
                            <View onPress={()=>setCarType(d.name)} key={d.id} style={tw`flex flex-row w-full h-20 justify-center`}>
                                <View style={tw`flex-1`}>
                                    <Image
                                    source={d.image}
                                    />
                                </View>
                                <View style={tw`flex-3 flex flex-col items-start justify-evenly`}>
                                    <Text style={tw`text-3xl text-black font-bold`}>
                                        {d.name}
                                    </Text>
                                    <Text style={tw`text-sm text-gray`}>
                                        {d.time}
                                    </Text>
                                    <Text style={tw`text-sm text-gray`}>
                                        {d.note}
                                    </Text>
                                </View>
                                <View style={tw`flex-1 flex-col `}>
                                    {d.promotion>0?
                                    (
                                        <>
                                            <Text style={tw`text-sm line-through text-gray-100`}>
                                                {d.price}
                                            </Text>
                                            <Text style={tw`text-sm text-black`}>
                                                {d.price-d.promotion}
                                            </Text>     
                                        </>
                                    ):
                                    (
                                        <Text style={tw`text-sm text-black`}>
                                            {item.price}
                                        </Text>
                                    )
                                    }
                                </View>
                            </View>
                        )}
                    </View>
                    }
                    keyExtractor={item => item.title}
                /> */}
            </View>
        </ScrollView>
                {
                    carType&&(
                        <View style={tw`h-20 m-4`}>
                            <Pressable

                                onPress={handleOrder}

                                style={({pressed})=>
                                    tw.style(`h-full flex flex-row justify-center items-center`,
                                        pressed?
                                        `bg-green-300`:
                                        `bg-green-500`
                                    )     
                                }
                                >
                                <Text style={tw`text-white text-xl `}>ORDER</Text>
                            </Pressable>
                        </View>
                    )
                }
      </ActionSheet>
  )
}

export default ChooseCar

const styles = StyleSheet.create({})