import { Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {s} from '../Lib/Helper'
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const TechnologiesList = ({technologies}) => {

    
    const navigation = useNavigation()

    return (
        <View style={styles.body_content}>
            {technologies.length > 0 ? (
                technologies.map((item, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('TechnologyScreen', {
                                    slug: item.slug,
                                    technology: item,
                                })
                            }}
                            key={index}
                            style={styles.body_content_item}>
                            <View style={styles.body_content_item_image}>
                                <Image
                                    source={{
                                        uri: item.thumbnail,
                                    }}
                                    resizeMode="cover"
                                    style={styles.body_content_item_thumb} />
                            </View>
                            <View style={styles.body_content_item_text}>
                                <Text numberOfLines={2} style={styles.body_content_item_text_title}>
                                    {item.name}
                                </Text>
                                <Text style={styles.body_content_item_text_subtitle}>
                                    {item.description} {parseInt(item.description) ? 'Students' : ''}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
            ) : (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: s(200),
                }}>
                    <Progress.CircleSnail color={['red', 'green', 'blue']} />
                </View>
            )}

        </View>
    )
}

export default TechnologiesList

const styles = StyleSheet.create({
    
    body_content_item_thumb:{
        width: '100%',
        height: s(100),
    },
    body_content_item_text:{
        padding: s(10),
    },  
    body_content_item_image:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    body_content:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: s(15),
        height:'100%',
        marginBottom: s(200),
    },
    body_content_item:{
        width: '47%',
        backgroundColor: '#ffffff',
        marginVertical: s(10),
        borderRadius: s(15),
        overflow: 'hidden',
        elevation: 5,
        shadowOpacity: 0.50,
        shadowRadius: 4.84,
    },
    body_content_item_text_title:{
        fontSize: s(14),
        fontWeight: 'bold',
        color: '#121212',
    },
    body_content_item_text_subtitle:{
        fontSize: s(13),
        marginTop: s(5),
        color: '#969696',
    }
})