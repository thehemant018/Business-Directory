// route====> businesslist/abc(category)
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
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
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getBusinessList();
        navigation.setOptions({
            headerShowen: true,
            headerTitle: category,
        });
    }, [])


    // used to get business list by category
    const getBusinessList = async () => {
        setLoading(true);
        setBusinessList([]);
        const q = query(collection(db, 'BusinessList'), where('category', '==', category));
        const querySnapshot = await getDocs(q);
        const businesses = [];
        querySnapshot.forEach((doc) => {
            // console.log(doc.data());
            // setBusinessList((prev) => [...prev,{id:doc?.id ,...doc.data()}]);
            businesses.push({ id: doc.id, ...doc.data() });
        })
        setBusinessList(businesses);
        setLoading(false);

    }

    return (
        <View>

            {businessList?.length>0&&loading==false?
            <FlatList
                data={businessList}
                onRefresh={getBusinessList} //when user refresh he will get updated data
                refreshing={loading}
                keyExtractor={(item, index) => index.toString()} 
                renderItem={({ item }) => <BusinessListCard business={item} />}
            />:
            loading?<ActivityIndicator 
            style={{marginTop:'70%'}}
            size={'large'}
            color={Colors.PRIMARY}/>:
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