import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../configs/FireBaseConfig';
import { useUser } from '@clerk/clerk-expo';


export default function intro({ business }) {
    const {user}=useUser();
    const router = useRouter();
   
    
    const onDelete = () => {
        Alert.alert('Do you want to Delete', 'Do you really want to Delete this business?', [
            {
                text: 'Cancel',
                styleer: 'Cancel'
            },
            {
                text: 'Delete',
                styleer: 'destructive',
                onPress: () => deleteBusiness()
            }
        ])
    }
    const deleteBusiness = async () => {
        console.log('Delete Business');
        await deleteDoc(doc(db, "BusinessList", business?.id));
        router.back();
        ToastAndroid.show("Business Deleted",ToastAndroid.LONG);
    }

    
    return (
        <View>
            <View style={{
                position: 'absolute',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                padding: 20
            }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back-circle" size={40} color="white" />
                </TouchableOpacity>
                <Ionicons name="heart-outline" size={40} color="white" />
            </View>
            <Image source={{ uri: business?.imageUrl }} style={{
                height: 340,
                width: '100%'
            }} />

            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20,
                marginTop: -20,
                backgroundColor: '#fff',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                alignItems: 'center'

            }}>
                <View style={{
                    padding: 20,
                    marginTop: -20,
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25
                }} >
                    <Text style={{
                        fontSize: 26,
                        fontFamily: 'outfit-bold',

                    }}>{business?.name} </Text>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'outfit'
                    }}>{business?.address}</Text>
                </View>
                {user?.primaryEmailAddress?.emailAddress==business?.userEmail&&<TouchableOpacity onPress={() => onDelete()}>
                    <FontAwesome name="trash" size={24} color="red" />
                </TouchableOpacity>}
                
            </View>
        </View>
    )
}