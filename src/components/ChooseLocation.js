import { StyleSheet, View, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import ActionSheet, {SheetManager} from 'react-native-actions-sheet'
import tw from 'twrnc'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from "@env";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux'
import { addDestination, addOrigin } from '../redux/locationSlice'

const ChooseLocation = () => {

    const [sheet, setSheet] = useState('')

    const dispatch = useDispatch() 

    const textInput1 = useRef(4);
    const textInput2 = useRef(5);
  
  return (
      <ActionSheet style={tw`flex flex-col items-center`} id="chooseLocationSheet" onBeforeShow={({sheet})=>setSheet(sheet)}>
          <View style={tw`w-full mt-4 flex flex-row justify-center`}>
             <MaterialCommunityIcons name='drag-horizontal-variant' size={30}/>
          </View>
          <View style={tw.style(`flex flex-col justify-evenly p-2 py-8`,{height:Dimensions.get('window').height*0.8})}>
          {
              sheet==='from'?
              (
                <GooglePlacesAutocomplete 
                    nearbyPlacesAPI = 'GooglePlacesSearch'
                    placeholder ="From..."
                    listViewDisplayed = "auto"
                    debounce ={400}
                    currentLocation ={true}
                    ref ={textInput1}
                    minLength ={2}
                    enablePoweredByContainer = {false}
                    fetchDetails ={true}
                    autoFocus ={true}
                    styles = {{textInput:{borderStyle:'solid',borderWidth:2,borderColor:'black'}}}
                    query ={{
                        key:GOOGLE_MAPS_APIKEY,
                        language:"en"
                    }}

                    onPress= {async(data,details = null)=>{
                        dispatch(addOrigin({
                          originLatitude: parseFloat(details.geometry.location.lat),
                          originLongitude: parseFloat(details.geometry.location.lng),
                          originAddress: details.formatted_address,
                          originName: details.name,
                        }))

                        await SheetManager.close('chooseLocationSheet')


                    }}

                />
              ):
              (
                   <GooglePlacesAutocomplete 
                    nearbyPlacesAPI = 'GooglePlacesSearch'
                    placeholder ="Going to..."
                    listViewDisplayed = "auto"
                    debounce ={400}
                    currentLocation ={true}
                    ref ={textInput2}
                    minLength ={2}
                    enablePoweredByContainer = {false}
                    fetchDetails ={true}
                    autoFocus ={true}
                    styles = {{textInput:{borderStyle:'solid',borderWidth:2,borderColor:'black'}}}                    query ={{
                        key:GOOGLE_MAPS_APIKEY,
                        language:"en"
                    }}

                    onPress= {async(data,details = null)=>{
                      dispatch(addDestination({
                        destinationLatitude: parseFloat(details.geometry.location.lat),
                        destinationLongitude: parseFloat(details.geometry.location.lng),
                        destinationAddress: details.formatted_address,
                        destinationName: details.name,
                      }))

                      await SheetManager.close('chooseLocationSheet')
                      
                    }}

                />
              )
          }
       
               
        </View>
      </ActionSheet>
  )
}

export default ChooseLocation

const styles = StyleSheet.create({})