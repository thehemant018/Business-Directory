import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/Colors'
import { FontAwesome } from '@expo/vector-icons';
import Category from '../../components/Home/Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';
import ExploreBuisnessList from '../../components/Explore/ExploreBuisnessList';

export default function explore() {
  const [businessList,setBusinessList]=useState([]);

  const GetBusinessByCategory= async (category)=>{
    setBusinessList([]);
    const q=query(collection(db,'BusinessList'),where('category','==',category));
    const querySnapshot=await getDocs(q);
    querySnapshot.forEach((doc)=>{
      // console.log(doc.data());
      setBusinessList(prev=>[...prev,{id:doc.id,...doc.data()}]);
    })
  }
  return (
    <View style={{
      padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30
      }}>Explore More</Text>
      
      {/* Searchbar */}
      <View style={{
                display:'flex',
                flexDirection:'row',
                gap:10,
                alignItems:'center',
                backgroundColor:'#fff',
                padding:10,
                marginVertical:10,
                marginTop:15,
                borderRadius:8,
                borderColor:Colors.PRIMARY,
                borderWidth:1
            }}>
            <FontAwesome name="search" size={24} color={Colors.PRIMARY} />
            <TextInput placeholder='Search...' style={{fontFamily:'outfit' , fontSize:16}} />
            </View>

      {/* Category */}
      <Category explore={true} 
      onCategorySelect={(category)=>GetBusinessByCategory(category)}/>

      {/* Business List */}
      <ExploreBuisnessList businessList={businessList}/>
    </View>
  )
}