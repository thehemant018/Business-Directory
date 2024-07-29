import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function CategoryItem({category}) {
  return (
    <TouchableOpacity>
        <View style={{
            padding:20,
            backgroundColor:Colors.ICON_BG,
            borderRadius:99,
            marginRight:15
        }}>
      <Image source={{uri:category.icon}} style={{
        width:40,
        height:40
      }}/>
      </View>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:12,
        textAlign:'center',
        marginTop:5
      }}>{category.name}</Text>
    </TouchableOpacity>
  )
}