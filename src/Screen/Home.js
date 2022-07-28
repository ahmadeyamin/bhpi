import { Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {s} from '../Lib/Helper'
import * as Progress from 'react-native-progress';

const Stack = createNativeStackNavigator()

// const Home = () => {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen name="Home" component={HomeScreen} />
//         </Stack.Navigator>
//     )
// }



const Home = ({navigation}) => {

    const [technologies, setTechnologies] = useState([])
    const teachers = []
    const [search, setSearch] = useState('')
    const [scrollContentHeight, setScrollContentHeight] = useState()


    const handleSearch = () => {}

    const fetchAllTeachers = async () => {

        // var all_urls = technologies.map((item)=> {
        //     return fetch(`http://api.bhpi.gov.bd/api/technology/${item.slug}/teachers`)
        // })

        console.log('0--------------------------0');

        Promise.all([
            fetch(`http://api.bhpi.gov.bd/api/technology/general-section/teachers`),
            fetch(`http://api.bhpi.gov.bd/api/technology/computer-technology/teachers`)
        ])
        .then((responses) => {
        const errors = responses.filter((response) => !response.ok);

        if (errors.length > 0) {
            throw errors.map((response) => Error(response.statusText));
        }

        const json = responses.map((response) => response.json());
            return Promise.all(json);
        })
        .then((data) => {
            data.forEach((datum) => {
                // teachers.push(datum.data.)
                // console.log(datum.data);
            });

            console.log(teachers);
        })
        .catch((errors) => {
            errors.forEach((error) => console.error(error));
        });
    }

    // useEffect(() => {
    //     console.log(teachers);

    //     return () => {
    //         setTeachers([])
    //     }
    // },[teachers])

    useEffect(() => {

        const fetchData = async () => {
            const response = await fetch('http://api.bhpi.gov.bd/api/technologies')
            const data = await response.json()
            // console.log(data.data[0]);
            setTechnologies(data.data.sort((a, b) => a.id - b.id))
        }

        fetchData()

        return () => {
            setTechnologies([])
        }
    }, [])

  return (
    <>
        <StatusBar backgroundColor="#7455f7" />
        <ImageBackground 
            source={require('../../asset/bg.png')} 
            style={styles.header}
            imageStyle={{ borderRadius: s(25)}}
        >
            <View style={styles.header_title}>
                <View style={styles.header_title_text}>
                    <Text style={styles.header_intro}>
                        Welcome To
                    </Text>
                    <Text style={styles.header_name}>
                        Bhola Polytechnic Institute
                    </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => {
                        console.log('pressed');
                    }}>
                        <Icon 
                            name="bell"
                            style={styles.header_icon} 
                            color='#ffffff' 
                            size={25} 
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <View style={styles.search_box}>
                    <Icon name='magnify' style={styles.search_icon} color='#a5a5a5' size={35} />
                    <TextInput 
                        placeholder='Search any topics' 
                        style={styles.search}
                        onFocus={() => fetchAllTeachers()} 
                    />
                </View>
                {false && (
                <View style={styles.search_results}>
                    <View style={styles.search_result_wrapper}>
                        <TouchableOpacity>
                            <View style={styles.search_item}>
                                <Text style={styles.search_item_text}>
                                    Title
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                )}
            </View>
        </ImageBackground>
        <View style={styles.body}>
            <View style={styles.body_header}>
                <View style={styles.body_header_text}>
                    <Text style={styles.body_header_text_title}>
                        Technologies
                    </Text>
                    <TouchableOpacity >
                        <Text style={styles.body_header_text_subtitle}>
                            See all
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View 
                style={{
                    height: '100%',
                }}
            >
                <ScrollView 
                    style={{
                        marginBottom: 70,
                    }}
                >
                    <View style={styles.body_content}> 
                        {technologies.length > 0 ? (
                            technologies.map((item, index) => {
                                return (
                                    <TouchableOpacity 
                                    onPress={()=>{
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
                                                {item.description} Students
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
                </ScrollView>
            </View>
        </View>
    </>
  )
}

export default Home

const styles = StyleSheet.create({
    header:{
        backgroundColor: '#7455f7',
        paddingBottom: s(20),
        borderBottomRightRadius: s(25),
        borderBottomLeftRadius: s(25),
        // overflow: 'hidden',
    },
    header_title:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: s(20),
        marginTop: s(10),
    },
    header_intro:{
        fontSize: s(27),
        color: '#ffffff',
        fontWeight: 'bold',
        letterSpacing: s(1),
    },  
    header_name:{
        fontSize: s(18),
        color: '#ffffff',   
    },
    header_title_text:{
        marginBottom: s(25),
    },  
    header_icon:{
        marginTop: s(10),
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        padding: s(5),
        borderRadius: s(30),
    },
    search_box:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginHorizontal: s(20),
        borderRadius: 40,
    },
    search_icon:{
        marginHorizontal: s(10),
    },
    search:{
        height: s(45),
        fontSize: s(15),
    },
    search_results:{
    },
    search_result_wrapper:{
        position: 'absolute',
        backgroundColor: '#ffffff',
        width: '90%',
        marginHorizontal: '5%',
        height: s(200),
        zIndex: 10,
        marginTop: s(10),
        borderRadius: s(20),
        padding: s(10),
    },
    body_header:{
        marginHorizontal: s(15),
        marginTop: s(20),
    },
    body_header_text:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    body_header_text_title:{
        fontSize: s(20),
        fontWeight: 'bold',
        color: '#121212',
    },
    body_header_text_subtitle:{
        fontSize: s(13),
        color: '#7455f7',
        marginTop: s(5),
        fontWeight: 'bold',
    },
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