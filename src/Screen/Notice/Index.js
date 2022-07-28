import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { WebView } from 'react-native-webview';
import * as Progress from 'react-native-progress';
import { s } from '../../Lib/Helper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Index = ({navigation}) => {

    const [notices, setNotices] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {

        const fetchData = async () => {
            setIsLoading(true)
            const response = await fetch('https://api.bhpi.gov.bd/api/notices')
            const data = await response.json()
            // console.log(data.data);
            setNotices(data.data)
            setIsLoading(false)
        }

        fetchData()

        return () => {
            setNotices([])
        }
    }, [])
    

    if (isLoading) {
        return (
            <View
                style={{
                    height: '100%',
                    // justifyContent: 'center',
                    marginTop: s(100),
                    alignItems: 'center',
                    width: '100%'
                }}>
                <Progress.CircleSnail color={['red', 'green', 'blue']} />
            </View>
        )
    }


  return (

    // Notice list
    <View>
        <ScrollView style={styles.wrapper}>
            {notices.map((notice, index) => {
                return (
                    <TouchableOpacity 
                        style={styles.notice_item} 
                        key={index}
                        onPress={() => {
                            navigation.navigate('NoticeDetailScreen', {
                                notice: notice
                            })
                        }}
                    >
                        <View>
                            <Icon 
                                name="bell" 
                                size={s(25)} 
                                style={{
                                    backgroundColor: '#ddd',
                                    padding: s(7),
                                    borderRadius: s(20),
                                    marginRight: s(10)
                                }}
                                color="#7455f7" />
                        </View>
                        <View style={styles.notice_list}>
                            <View style={styles.notice_list_title}>
                                <Text style={styles.notice_list_title_text}>
                                    {notice.title}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                )
            })}
        </ScrollView>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
    notice_item:{
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginVertical: s(7),
        padding: s(10),
        alignItems: 'center',
        borderRadius: s(12),
        marginHorizontal: s(10),
        elevation: 5,
    },
    notice_list_title_text:{
        paddingRight: s(45),
    }
})

// 