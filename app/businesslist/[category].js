// route====> businesslist/abc(category)
import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';
import BusinessListCard from '../../components/BusinessList/BusinessListCard';
import { Colors } from '../../constants/Colors';

export default function BusinesslistByCategory() {
    const [businessList, setBusinessList] = useState([]);
    const navigation = useNavigation();
    const { category } = useLocalSearchParams();
    useEffect(() => {
        getBusinessList();
        navigation.setOptions({
            headerShowen: true,
            headerTitle: category,
        });
    }, [])


    // used to get business list by category
    const getBusinessList = async () => {
        setBusinessList([]);
        const q = query(collection(db, 'BusinessList'), where('category', '==', category));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // console.log(doc.data());
            setBusinessList((prev) => [...prev, doc.data()]);
        })

    }

    return (
        <View>
            {businessList?.length>0?<FlatList
                data={businessList}
                keyExtractor={(item, index) => index.toString()} // Provide a unique key for each item
                renderItem={({ item }) => <BusinessListCard business={item} />}
            />:
            <Text style={{
                fontSize:20,
                fontFamily:'outfit-bold',
                color:Colors.GRAY,
                textAlign:'center',
                marginTop:'50%'
            }}>No Business Found</Text>
            }
        </View>
    )
}