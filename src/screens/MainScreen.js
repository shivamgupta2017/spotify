/*
 * Copyright (c) 2011-2018, Zingaya, Inc. All rights reserved.
 */

'use strict';

import React from 'react';
import {
    Text,
    View,
    Modal,
    TouchableHighlight,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    StatusBar,
    PermissionsAndroid,
    Platform,
    YellowBox,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import CallButton from '../components/CallButton';
import LoginManager from '../manager/LoginManager';
import CallManager from '../manager/CallManager';

import {Voximplant} from 'react-native-voximplant';
import COLOR from '../styles/Color';
import COLOR_SCHEME from '../styles/ColorScheme';
import styles from '../styles/Styles';
const clientId = 'f38780dd02ef417ba5995728bf36ff94';
const clientSecret = '0bebd4759367459fa85b4a6af4461947';
const encodedIdSecret = 'Basic ZjM4NzgwZGQwMmVmNDE3YmE1OTk1NzI4YmYzNmZmOTQ6MGJlYmQ0NzU5MzY3NDU5ZmE4NWI0YTZhZjQ0NjE5NDc=';
const BASE_URL = 'https://accounts.spotify.com/api/'


export default class MainScreen extends React.Component {

    
    static navigationOptions = ({ navigation }) => {
        // const params = navigation.state.params || {};

        return {
            // headerLeft: (
            //     // <TouchableOpacity onPress={params.backClicked}>
            //     //     <Text style={styles.headerButton}>
            //     //         Logout
            //     //     </Text>
            //     // </TouchableOpacity>
            // ),
            // title: LoginManager.getInstance().displayName,
        };
    };
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        // this.props.navigation.setParams({ settingsClick: this._goToSettings, backClicked: this._goToLogin });
        // LoginManager.getInstance().on('onConnectionClosed', this._connectionClosed);
        // var grant_type = encodeURIComponent('grant_type');
        // var client_credentials = encodeURIComponent('client_credentials');
        // formBody.push(grant_type + '=' + client_credentials);
        // formBody = formBody.join('&');

        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ZjM4NzgwZGQwMmVmNDE3YmE1OTk1NzI4YmYzNmZmOTQ6MGJlYmQ0NzU5MzY3NDU5ZmE4NWI0YTZhZjQ0NjE5NDc=',
                    'Accept': 'application/json'
                },
                body: 'grant_type=client_credentials',
            });
            const tokenResponse = await response.json();
            console.log(tokenResponse.access_token)
            await AsyncStorage.setItem('@userToken', tokenResponse.access_token);
            // this.props.navigation.setParams({ settingsClick: this._goToSettings, backClicked: null });
            this.props.navigation.dispatch(this.props.navigation.navigate({ routeName: 'playlist' }));
        } catch (error) {
           console.log('error > ', error) 
        }

    }

    // componentWillUnmount() {
    //     // LoginManager.getInstance().off('onConnectionClosed', this._connectionClosed);
    // }

    // _goToSettings = () => {
    //     // this.props.navigation.navigate('Settings');
    // };

    // _goToLogin = () => {
    //     LoginManager.getInstance().logout();
    //     this.props.navigation.navigate('Login');
    // };

    // _connectionClosed = () => {
    //     this.props.navigation.navigate('Login');
    // };

    // async makeCall(isVideoCall) {
    //     console.log('MainScreen: make call: ' + this.number + ', isVideo:' + isVideoCall);
    //     try {
    //         if (Platform.OS === 'android') {
    //             let permissions = [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO];
    //             if (isVideoCall) {
    //                 permissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);
    //             }
    //             const granted = await PermissionsAndroid.requestMultiple(permissions);
    //             const recordAudioGranted = granted['android.permission.RECORD_AUDIO'] === 'granted';
    //             const cameraGranted = granted['android.permission.CAMERA'] === 'granted';
    //             if (recordAudioGranted) {
    //                 if (isVideoCall && !cameraGranted) {
    //                     console.warn('MainScreen: makeCall: camera permission is not granted');
    //                     return;
    //                 }
    //             } else {
    //                 console.warn('MainScreen: makeCall: record audio permission is not granted');
    //                 return;
    //             }
    //         }
    //         this.props.navigation.navigate('Call', {
    //             callId: null,
    //             isVideo: isVideoCall,
    //             isIncoming: false,
    //             callTo: this.number,
    //         });
    //     } catch (e) {
    //         console.warn('MainScreen: makeCall failed: ' + e);
    //     }
    // }

    render() {
        return (
            <SafeAreaView style={styles.safearea}>
                <StatusBar barStyle={COLOR_SCHEME.LIGHT} backgroundColor={COLOR.PRIMARY_DARK} />
                <View style={styles.useragent}>
                    {/* <TextInput
                        underlineColorAndroid="transparent"
                        style={[styles.forminput, styles.margin]}
                        onChangeText={(text) => { this.number = text;}}
                        placeholder="Call to"
                        defaultValue={this.number}
                        autoCapitalize="none"
                        autoCorrect={false}
                        blurOnSubmit={true} /> */}
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 90 }}>
                        <CallButton icon_name="call" color={COLOR.ACCENT} buttonPressed={() => this.makeCall(false)} />
                        <CallButton icon_name="videocam" color={COLOR.ACCENT} buttonPressed={() => this.makeCall(true)} />
                    </View> */}

                    {/* <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.isModalOpen}
                        onRequestClose={() => { }}>
                        <TouchableHighlight
                            onPress={(e) => this.setState({ isModalOpen: false, modalText: '' })}
                            style={styles.container}>
                            <View style={[styles.container, styles.modalBackground]}>
                                <View
                                    style={[styles.innerContainer, styles.innerContainerTransparent]}>
                                    <Text>{this.state.modalText}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </Modal> */}
                </View>
            </SafeAreaView>
        );
    }
}
