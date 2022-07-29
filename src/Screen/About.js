import React from 'react'
import { StyleSheet, Text, View, Linking, ScrollView, Dimensions, TouchableWithoutFeedback,ToastAndroid, TouchableOpacity, Alert } from 'react-native'
import { handleLinks } from '../Lib/Helper'


const About = () => {


    return (
        <ScrollView style={{height:'100%'}}>
            <View style={{display:'flex',alignItems: 'center',justifyContent: 'center',marginVertical:40,minHeight: Dimensions.get('window').height - 200}}>
                <TouchableWithoutFeedback onPress={()=> checkClicks()}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold',color: '#444'}}>
                        My BHPI
                    </Text>
                </TouchableWithoutFeedback>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'red' }}>
                    v1.0.0
                </Text>
                <Text style={{ fontSize: 14, textAlign: 'center',color: '#333'}}>
                    {'\n'}
                    App development project from computer department of {'\n'} 
                    BHOLA POLYTECHNIC INSTITUTE.
                    {'\n'}
                </Text>
                <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 10,color: '#333' }}>
                    Developed By
                </Text>
                <View style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <TouchableOpacity style={styles.dev_button} onPress={() => { handleLinks('https://www.facebook.com/ahmadeyamin') }}>
                        <Text style={styles.dev_button_text}>Ahmad Eyamin (Developer) 🚀</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.dev_button} onPress={() => { handleLinks('https://www.facebook.com/mdmajarulislam.mahim') }}>
                        <Text style={styles.dev_button_text}>MD.Shakil (Design)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.dev_button} onPress={() => { handleLinks('https://www.facebook.com/MuhammadMahfuz00') }}>
                        <Text style={styles.dev_button_text}>Muhammad Mahfuz (Design)</Text>
                    </TouchableOpacity>

                </View>
                <Text style={{ textAlign: 'center', marginTop: 5, fontWeight: 'bold',color: '#333'}}>
                    By
                    {'\n'}
                    CMT 18-19
                    {'\n'}
                        <Text style={{ fontSize: 25 }}>
                            🇧🇩
                    </Text>
                        {'\n'}
                        {'\n'}
                    With
                    {'\n'}
                    <Text style={{ fontSize: 25 }}>
                            ❤️
                    </Text>                    
                </Text>

                <TouchableOpacity style={{ marginTop: 5 }} onPress={()=>{
                    
                    }}>
                    <Text style={{ color: '#fff', borderRadius: 9, fontWeight: 'bold', fontSize: 18, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#f44336' }}>Rate On Google Play</Text>
                </TouchableOpacity>

                <Text style={{textAlign: 'center'}}>
                        Version Code: 1.0.0
                </Text>

            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    about_wrapper: {
        // height: '100%',
        backgroundColor: '#fff',
        // display: 'flex',
        // alignItems: 'center',
        // flexDirection: 'column',
        // justifyContent: 'center'
    },
    dev_button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#4ccbd7',
        marginVertical: 5,
        textAlign: 'center',
        borderRadius: 5,
        elevation: 3,
    },
    dev_button_small: {
        paddingHorizontal: 7,
        paddingVertical: 3,
        backgroundColor: '#777',
        marginVertical: 5,
        textAlign: 'center',
        borderRadius: 5,
        elevation: 0,
    },
    dev_button_text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,

    },
    dev_button_text_small: {
        color: '#fff',
        fontSize: 13,

    },
    support_btn: {
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#888',
        borderRadius: 5
    },
    support_btn_text: {
        color: '#fff',
        fontWeight: 'bold',
    }
})

export default About
