import { View, Text } from 'react-native'
import React from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../configs/FireBaseConfig'

export default function Slider() {
  const GetSliderList=async ()=>{
    const q=query(collection(db,'Slider'));
    const querySnapshot=await getDocs(q);

    querySnapshot.forEach((doc)=>{
      console.log(doc.data);
    })
  }
  return (
    <View>
      <Text>Slider</Text>
    </View>
  )
}