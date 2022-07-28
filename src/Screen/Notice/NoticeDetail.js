import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {WebView} from 'react-native-webview';
import * as Progress from 'react-native-progress';
import { s } from '../../Lib/Helper';

const NoticeDetail = ({route}) => {

    const renderLoadingView = () => {
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
        );
  }
  return (
    <View
        style={{
            height: '100%',
        }}
    >
      <WebView 
        source={{uri: `https://drive.google.com/viewerng/viewer?embedded=true&url=${route.params.notice.file}`}}
        renderLoading={renderLoadingView} startInLoadingState={true}
      
      />
    </View>
  )
}

export default NoticeDetail

const styles = StyleSheet.create({})

// 