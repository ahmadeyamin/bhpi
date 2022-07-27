import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import * as Progress from 'react-native-progress';
import { s } from '../Lib/Helper';

const Technology = ({ route }) => {


    const [teachers, setTeachers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://api.bhpi.gov.bd/api/technology/${route.params.slug}/teachers`)
            const data = await response.json()
            console.log(data.data);
            setTeachers(data.data)
            setIsLoading(false)
        }

        fetchData()

        // console.log(route.params.technology.thumbnail);


        return () => {
            setTeachers([])
            setIsLoading(true)
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
        <View>

            <View>
                <Image
                    source={{
                        uri: route.params.technology.thumbnail
                    }}
                    style={styles.header_image}
                    resizeMode="cover"
                />
            </View>

        </View>
    )
}

export default Technology

const styles = StyleSheet.create({
    header_image:{
        width: '100%',
        height: s(200),
    }
})