import React from 'react';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList  } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator'
import AntDesign from 'react-native-vector-icons/AntDesign'
import realmContext from '../realm/app'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../redux/userSlice'

const Drawer = createDrawerNavigator();
const { useRealm, useQuery } = realmContext


const CustomDrawerContent = (props) =>{

    const realm = useRealm()
    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.user)

    const handleLogout = () =>{
         let currentUserId = user?.id
         realm.write(()=>{
                      // Find the user
                      const user = (realm.objects("User").filtered(`_id=oid(${currentUserId})`))[0];
//                      console.log("User found with ID: ",user._id)
                      // Delete the collection from the realm.
                      if (user){
                        realm.delete(user);
                        console.log("User has logged out successfully.")

                      }
                })
          realm.close()
         dispatch(reset())

    }

    return(
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props}/>
            <DrawerItem
               icon={({focussed,size})=><AntDesign name="logout" color={focussed?"gray":"black"} size={size}/>}
               label="Logout"
               onPress={handleLogout}/>
        </DrawerContentScrollView>


       )
}
const DrawerNavigator = () =>{

    return(

        <Drawer.Navigator drawerContent={(props)=><CustomDrawerContent {...props}/>}>
            <Drawer.Screen
                name="stack"
                component={StackNavigator}
                options={{
                    title:"Home",
                    drawerIcon:({focussed,size})=><AntDesign name="home" color={focussed?"gray":"black"} size={size}/>,
                    headerShown:false,
                }}
            />

        </Drawer.Navigator>
    )
}

export default DrawerNavigator