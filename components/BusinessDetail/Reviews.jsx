import { View, Text, TextInput, TouchableOpacity, ToastAndroid, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Colors } from '../../constants/Colors';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';
import { db } from '../../configs/FireBaseConfig';

export default function Reviews({ business }) {
    const [rating, setRating] = useState(4);
    const [userInput, setUserInput] = useState();
    const { user } = useUser();
    const onSubmit = async () => {
        const docRef = doc(db, 'BusinessList', business?.id);
        await updateDoc(docRef, {
            reviews: arrayUnion({
                rating: rating,
                comment: userInput,
                userName: user?.fullName,
                userImage: user?.imageUrl,
                userEmail: user?.primaryEmailAddress?.emailAddress
            })
        })
        ToastAndroid.show('Comment Added Successfuly', ToastAndroid.BOTTOM)
    }
    return (
        <View style={{
            padding: 20,
            backgroundColor: '#fff',
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20
            }}>Reviews</Text>

            <View>
                <Rating
                    showRating={false}
                    imageSize={25}
                    onFinishRating={(rating) => setRating(rating)}
                    style={{ paddingVertical: 10 }}
                />
                <TextInput
                    placeholder='Write your comment'
                    numberOfLines={4}
                    onChangeText={value => setUserInput(value)}
                    style={{
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        borderColor: Colors.GRAY,
                        textAlignVertical: 'top'
                    }}
                />
                <TouchableOpacity
                    disabled={!userInput}
                    onPress={() => onSubmit()}
                    style={{

                        padding: 10,
                        backgroundColor: Colors.PRIMARY,
                        borderRadius: 6,
                        marginTop: 10
                    }}>
                    <Text style={{
                        fontFamily: 'outfit',
                        color: '#fff',
                        textAlign: 'center'
                    }}>Submit</Text>
                </TouchableOpacity>
            </View>


            {/* Display Reviews (u can use flatlist also) */}
            <View>
                {business?.reviews?.map((item, index) => (
                    <View style={{
                        display:'flex',
                        flexDirection:'row',
                        gap:12,
                        alignItems:'center',
                        marginTop:10,
                        padding:10,
                        borderWidth:1,
                        borderColor:Colors.GRAY,
                        borderRadius:15
                    }}>
                        <Image source={{ uri: item.userImage }} style={{
                            width: 50,
                            height: 50,
                            borderRadius: 99
                        }} />
                        <View style={{
                            display:'flex',
                            gap:5
                        }}>
                        <Text style={{
                            fontFamily:'outfit-medium'
                        }}>{item?.userName}</Text>
                            <Rating 
                            imageSize={20}
                            ratingCount={item.rating}
                            style={{
                                alignItems:'flex-start'
                            }}
                            />
                            <Text>{item?.comment}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}