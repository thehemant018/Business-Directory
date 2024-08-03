// route ====> businessdetail/businessid
import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';
import { Colors } from '../../constants/Colors';
import Intro from '../../components/BusinessDetail/Intro';
import ActionButton from '../../components/BusinessDetail/ActionButton';
import About from '../../components/BusinessDetail/About';

export default function BusinessDetail() {
    const {businessid}=useLocalSearchParams();  //businessid== must same as file name
    const [business, setBusiness] = useState();
    const [loading,setLoading]=useState(false);
    const navigation = useNavigation();


    useEffect(() => {
        GetBusinessDetailById();
        navigation.setOptions({
            headerShown: false,
        });
    }, [])
    

    // used to get business detail by id
    const GetBusinessDetailById=async ()=>{
        setLoading(true);
        const docRef=doc(db,'BusinessList',businessid);
        const docSnap=await getDoc(docRef);
        if(docSnap.exists()){
            // console.log("Document Data:",docSnap.data());
            setBusiness(docSnap.data());
            setLoading(false)
        }
        else{
            console.log("No such document!");
        }
        console.log('bjbajkasbjsajk',docSnap.data());
    }
  return (
    <ScrollView>
        {loading?
        <ActivityIndicator
        size={'large'}
        color={Colors.PRIMARY}
        style={{
            marginTop:'70%'
        }} />:
        <View>
            {/* Intro */}
            <Intro business={business}/>
            {/* Action Button */}
            <ActionButton business={business}/>

            {/* About Section */}
            <About  business={business} />
        </View>
        }
      
    </ScrollView>
  )
}