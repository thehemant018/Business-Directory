import { View, Text } from 'react-native'
import React from 'react'
import UserIntro from '../../components/Profile/UserIntro'
import MenuList from '../../components/Profile/MenuList'

export default function profile() {
  return (
    <View style={{
      padding:20
    }}>
      <Text style={{
      fontFamily:'outfit-bold',
      fontSize:25
    }}>Profile</Text>


    {/* User Info */}
    <UserIntro />

    {/* Menu List */}
    <MenuList />
    </View>
  )
}