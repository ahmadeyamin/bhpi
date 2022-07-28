import { Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {s} from '../Lib/Helper'
import * as Progress from 'react-native-progress';
import TechnologiesList from '../Componnents/TechnologiesList';
import SearchItemList from '../Componnents/SearchItemList';

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
    const [teachers, setTeachers] = useState([])
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [enableSearch, setEnableSearch] = useState(false)
    


    const handleSearch = () => {

    }

    const searchTeachers = (str) => {
        // Optional, but fallback to key['name'] if not selected

        var results = []

        if (str.length < 1 || str === '') {
            setSearchResults([])
            setEnableSearch(false)
            return
        }else{
            
            setEnableSearch(true)
        }

        for (var i=0; i < teachers.length; i++) {
            if (teachers[i].name.toLowerCase().includes(str.toLowerCase()) ||
                teachers[i].email.toLowerCase().includes(str.toLowerCase()) ||
                teachers[i].phone.toLowerCase().includes(str.toLowerCase()) ||
                teachers[i].technology.toLowerCase().includes(str.toLowerCase()) ||
                teachers[i].title.toLowerCase().includes(str.toLowerCase())
            ){
                // console.log(teachers[i]);
                results.push(teachers[i])
            }
        }

        setSearchResults([...results])
        // return results
    }


    const fetchAllTeachers = async () => {

        var all_urls = technologies.map((item)=> {
            return fetch(`http://api.bhpi.gov.bd/api/technology/${item.slug}/teachers`)
        })

        console.log('0--------------------------0');

        Promise.all(all_urls)
        .then((responses) => {
        const errors = responses.filter((response) => !response.ok);

        if (errors.length > 0) {
            throw errors.map((response) => Error(response.statusText));
        }

        const json = responses.map((response) => response.json());
            return Promise.all(json);
        })
        .then((response) => {

            var res = []

            response.forEach((datum) => {
                // console.log(datum.data);
                res.push(...datum.data.map((item) => {
                    return {
                        name: item.name,
                        email: item.email,
                        phone: item.phone,
                        technology: item.technology,
                        education: item.education,
                        title: item.title,
                        avatar: item.avatar,
                    }
                }))
            });
            
            // console.log(datum.data);
            console.log(res);
            setTeachers(res)
        })
        .catch((errors) => {
            errors.forEach((error) => console.error(error));
        });
    }

    useEffect(() => {
        console.log('searchResults',searchResults.length);
        console.log('teachers',teachers.length);

        return () => {
            // setTeachers([])
        }
    },[searchResults,teachers])

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
                        placeholder='Search any teacher' 
                        style={styles.search}
                        onFocus={() => fetchAllTeachers()} 
                        onChangeText={(text) => {
                            console.log(text);
                            searchTeachers(text);
                        }}
                    />
                </View>
            </View>
        </ImageBackground>
        <View style={styles.body}>
            <View style={styles.body_header}>
                <View style={styles.body_header_text}>
                    <Text style={styles.body_header_text_title}>
                        {enableSearch ? 'Teachers' : 'Technologies'}
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
                    {enableSearch ? (
                        <SearchItemList teachers={searchResults} />
                    ):(

                        <TechnologiesList technologies={technologies} />
                    )}
                    <View>
                        
                    </View>
                </ScrollView>
            </View>
        </View>
    </>
  )
}

export default Home

const styles = StyleSheet.create({
    body:{
        position: 'relative',
        zIndex: 0,
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
    

})