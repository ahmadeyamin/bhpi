import { Alert, Image, ImageBackground, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import * as Progress from 'react-native-progress';
import { handleLinks, s } from '../Lib/Helper';
import { useHeaderHeight } from '@react-navigation/elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Technology = ({ route, navigation }) => {


    const [teachers, setTeachers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const headerHeight = useHeaderHeight();

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://api.bhpi.gov.bd/api/technology/${route.params.slug}/teachers`)
            const data = await response.json()
            console.log(data.data);
            setTeachers(data.data)
            setIsLoading(false)
        }

        // console.log(route.params);

        fetchData()

        // console.log(route.params.technology.thumbnail);


        return () => {
            setTeachers([])
            setIsLoading(true)
        }
    }, [])

    useLayoutEffect(() => {
        
    }, [navigation]);



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
        <SafeAreaView>
            <ScrollView 
                onScroll={(e) => {
                    if (e.nativeEvent.contentOffset.y > s(230)) {
                        navigation.setOptions({
                            headerTintColor: '#333',
                        })
                    }else{
                        navigation.setOptions({
                            headerTintColor: '#fff',
                        })
                    }
                }}
            >
            
            <View>
                <Image
                    source={{
                        uri: route.params.technology.thumbnail
                    }}
                    style={styles.header_image}
                    resizeMode="cover"
                />
                <View style={{
                    paddingTop: headerHeight,
                    height: s(240),
                    width: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    paddingHorizontal: s(15),
                }}>
                    <Text style={styles.header_title}>{route.params.technology.name}</Text>
                    <Text style={styles.header_students}>{route.params.technology.description} Students</Text>
                    <TouchableOpacity onPress={()=>handleLinks(`tel:${route.params.technology.phone}`)} style={styles.header_contact}>

                        <Icon 
                            name="phone" 
                            size={25}  
                            color='#444' 
                        />
                        <Text style={styles.header_text}>
                            {route.params.technology.phone ?? 'N\\A'}
                        </Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleLinks(`mailto:${route.params.technology.email}`)} style={styles.header_contact}>

                        <Icon 
                            name="email" 
                            size={25}  
                            color='#444' 
                        />
                        <Text style={styles.header_text}>
                            {route.params.technology.email ?? 'N\\A'}
                        </Text>

                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <View style={styles.teacher_container}>
                    <Text style={styles.teacher_title}>Teachers</Text>
                    <View style={styles.teacher_list}>
                        {teachers.map((teacher, index) => {
                            return (
                                <View key={index} onPress={() => {
                                    
                                }}>
                                    <View style={styles.teacher_item}>
                                        <Image
                                            source={{
                                                uri: teacher.avatar
                                            }}
                                            style={styles.teacher_image}
                                            resizeMode="cover"
                                        />
                                        <View style={styles.teacher_info}>
                                            <View>
                                                <Text style={styles.teacher_type}>
                                                    {teacher.title}
                                                </Text>
                                                <Text numberOfLines={1} style={styles.teacher_name}>
                                                    {teacher.name}
                                                </Text>
                                                <Text style={styles.teacher_sub}>
                                                    {teacher.education}
                                                </Text>
                                            </View>
                                            <View>
                                                <TouchableOpacity onPress={() => handleLinks(`tel:${teacher.phone}`)} style={styles.teacher_phone}>

                                                    <Icon 
                                                        name="phone" 
                                                        size={20}  
                                                        color='#444' 
                                                    />
                                                    <Text style={styles.header_text}>
                                                        {teacher.phone ?? 'N\\A'}
                                                    </Text>

                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => handleLinks(`mailto:${teacher.email}`)} style={styles.teacher_phone}>

                                                    <Icon 
                                                        name="email" 
                                                        size={20}  
                                                        color='#444' 
                                                    />
                                                    <Text style={styles.header_text}>
                                                        {teacher.email ?? 'N\\A'}
                                                    </Text>

                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        
                                    </View>
                                </View>
                            )
                        }
                        )}
                    </View>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Technology

const styles = StyleSheet.create({
    header_image: {
        width: '100%',
        height: s(240),
        position: 'absolute',
    },
    header_title: {
        fontSize: s(25),
        color: '#fff',
        fontWeight: 'bold',
    },
    header_students: {
        fontSize: s(16),
        color: '#ddd',
        // fontWeight: 'bold',
        marginTop: s(5),
        marginBottom: s(15),
    },
    header_contact: {
        fontSize: s(14),
        color: '#ddd',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: s(5),
        marginTop: s(5),
        borderRadius: s(15),
        // textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header_text: {
        fontSize: s(14),
        color: '#444',
        marginLeft: s(5),
        fontWeight: 'bold',

    },
    teacher_title:{
        fontSize: s(20),
        color: '#444',
        fontWeight: 'bold',
        marginBottom: s(10),
        // textAlign: 'center',
    },
    
    teacher_name:{
        fontSize: s(15),
        width: s(190),
    },
    teacher_sub:{
        fontSize: s(12),
        color: '#444',
        marginBottom: s(5),
    },
    teacher_phone:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

    },
    teacher_type:{
        fontSize: s(9),
        color: '#555',
    },  
    teacher_container: {
        padding: s(15),
    },
    teacher_image: {
        width: s(100),
        height: s(100),
        borderRadius: s(50),
        marginRight: s(10),
        borderColor: '#ddd',
        borderWidth: 2,
    },
    teacher_item:{
        flexDirection: 'row',
        padding: s(10),
        backgroundColor: '#fff',
        marginVertical: s(5),
        elevation: 4,
        shadowOpacity: 0.3,
        borderRadius: s(15),
        overflow: 'hidden',
    },
    teacher_info:{
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
})