import { Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import { handlePress, s } from '../Lib/Helper'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const SearchItemList = ({ teachers }) => {

    const navigation = useNavigation()


    if (teachers.length < 1) {
        return (
            <View>
                <View style={styles.teacher_container}>
                    <View style={styles.teacher_list}>
                        <Text style={styles.no_result}>
                            No teachers found
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View>
            <View style={styles.teacher_container}>
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
                                            <TouchableOpacity onPress={() => handlePress(`tel:${teacher.phone}`)} style={styles.teacher_phone}>

                                                <Icon
                                                    name="phone"
                                                    size={20}
                                                    color='#444'
                                                />
                                                <Text style={styles.header_text}>
                                                    {teacher.phone ?? 'N\\A'}
                                                </Text>

                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handlePress(`mailto:${teacher.email}`)} style={styles.teacher_phone}>

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
    )
}

export default SearchItemList

const styles = StyleSheet.create({
    teacher_title: {
        fontSize: s(20),
        color: '#444',
        fontWeight: 'bold',
        marginBottom: s(10),
        // textAlign: 'center',
    },

    teacher_name: {
        fontSize: s(15),
        width: s(190),
    },
    teacher_sub: {
        fontSize: s(12),
        color: '#444',
        marginBottom: s(5),
    },
    teacher_phone: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

    },
    teacher_type: {
        fontSize: s(9),
        color: '#555',
    },
    teacher_container: {
        padding: s(15),
        marginBottom: s(200),
    },
    teacher_image: {
        width: s(100),
        height: s(100),
        borderRadius: s(50),
        marginRight: s(10),
        borderColor: '#ddd',
        borderWidth: 2,
    },
    teacher_item: {
        flexDirection: 'row',
        padding: s(10),
        backgroundColor: '#fff',
        marginVertical: s(5),
        elevation: 4,
        shadowOpacity: 0.3,
        borderRadius: s(15),
        overflow: 'hidden',
    },
    teacher_info: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    no_result: {
        fontSize: s(20),
        color: '#ff2000',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: s(20),

    }
})