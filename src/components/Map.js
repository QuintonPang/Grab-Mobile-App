import { StyleSheet, Text, View, Image } from 'react-native'
import React, { createRef, useState, useEffect } from 'react'
import { mapStyle } from '../global/mapStyle'
import { carsAround } from '../global/data'
import MapView, { PROVIDER_GOOGLE,} from 'react-native-maps'; 
// import * as Location from 'expo-location';
import tw from 'twrnc'
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from "@env";
import RNLocation from 'react-native-location'

const Map = ({origin,destination}) => {

    RNLocation.configure({
        distanceFilter:0, // minimum distance in meters that a device location will change before the new location update callback is called
                               // set it to 0 so as to change whenever you move your device
    })

    const _map = createRef()
    const [latLng,setLatLng] = useState({})

    useEffect(()=>{
        if(destination?.latitude &&destination?.longitude&& origin?.latitude && origin?.longitude){
//            _map.current.fitToCoordinates(
//              [{latitude:origin.latitude,longitude:origin.longitude},{latitude:destination.latitude,longitude:destination.longitude}],{
//                edgePadding:{top:450,right:50,left:50,bottom:350},
//                animated:true
//              }
//            )
          }
        //   console.log(destination,origin)
    },[destination,origin])

    
    const checkPermission =async()=>{
        try{
//            const hasPermission = await Location.requestForegroundPermissionsAsync();
//            if(hasPermission.status === 'granted') {
//                const permission = await askPermission();
//                return permission
//            }
//            return true
//
                    let permission = await RNLocation.checkPermission({
                         ios: 'whenInUse', // or 'always'
                         android: {
                           detail: 'coarse' // or 'fine'
                         }
                    })
                    console.log("Checking permission for location: " + permission)
        }catch(err){
            console.log(err)
        }

    };
    
    
    const askPermission = async()=>{
    try{
//        const permission = await Location.requestForegroundPermissionsAsync()
//        return permission.status === 'granted';


     let permission = await RNLocation.requestPermission({
       ios: "whenInUse",
       android: {
         detail: "coarse",
         rationale: {
           title: "We need to access your location",
           message: "We use your location to show where you are on the map",
           buttonPositive: "OK",
           buttonNegative: "Cancel"
         }
       }
     })
     console.log("Permission for location has been asked with result: "+permission)
     return permission
    }catch(err){
        console.log(err)
    }

    };
    
    
    const getLocation = async()=>{
        try{
//            const {granted} =await Location.requestForegroundPermissionsAsync();
//            if(!granted)return;
//            const {
//                coords:{latitude,longitude},
//            } = await Location.getCurrentPositionAsync();

            let permission = await askPermission()
            let location;

            if(!permission) {
                 permission = await askPermission()
                 location = await RNLocation.getLatestLocation({timeout: 100})
                 console.log("Your location: ")
                 console.log(location, location.longitude, location.latitude,
                       location.timestamp)
            } else {
                console.log("Your location: ")
                location = await RNLocation.getLatestLocation({timeout: 100})
                console.log(location, location.longitude, location.latitude,
                            location.timestamp)
            }
            setLatLng({latitude:location.latitude,longitude:location.longitude})


        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
//      checkPermission();
        getLocation();
//       console.log(latLng)
    },[])

  return (
    <MapView
        style={tw`w-full h-full`}
        ref = {_map}
        provider ={PROVIDER_GOOGLE}
        customMapStyle ={mapStyle}
        showsUserLocation ={true}
        followsUserLocation = {true}
        // initialRegion is not working
        // initialRegion = {{...carsAround[0],latitudeDelta:0.008,longitudeDelta:0.008}}
        region = {(!origin&&!destination)?{...carsAround[0],latitudeDelta:0.008,longitudeDelta:0.008}:null}
    >
        {(origin===null&&destination===null)&&carsAround.map((item,index)=>
        <MapView.Marker coordinate = {item} key= {index.toString()}>
            <Image 
                source = {require('../../assets/carMarker.png')}
                resizeMode = "cover"
            />
        </MapView.Marker>       
        )}

        
        { origin?.latitude&& origin?.longitude&&   
            <MapView.Marker coordinate = {{latitude: origin?.latitude,longitude: origin?.longitude}} anchor = {{x:0.5,y:0.5}} >
                <Image 
                    source ={require('../../assets/location.png')}
                    resizeMode ="cover"
                />
            </MapView.Marker>
        }
      
        { destination?.latitude && destination?.longitude &&   
        <MapView.Marker coordinate = {{latitude:destination?.latitude,longitude:destination?.longitude}} anchor = {{x:0.5,y:0.5}} >
            <Image 
                source ={require('../../assets/location.png')}
                resizeMode ="cover"
            />
        </MapView.Marker>
        }


        {destination?.latitude &&destination?.longitude&& origin?.latitude && origin?.longitude&&
            <MapViewDirections 
                origin={{latitude:origin?.latitude,longitude:origin?.longitude}}
                destination={{latitude:destination?.latitude,longitude:destination?.longitude}}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={4}
                strokeColor={'#000000'}
            />
        } 
    </MapView> 
  )
}

export default Map

const styles = StyleSheet.create({})