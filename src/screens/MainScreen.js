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
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import COLOR from '../styles/Color';
import COLOR_SCHEME from '../styles/ColorScheme';
import styles from '../styles/Styles';
const clientId = 'f38780dd02ef417ba5995728bf36ff94';
const clientSecret = '0bebd4759367459fa85b4a6af4461947';
const encodedIdSecret = 'Basic ZjM4NzgwZGQwMmVmNDE3YmE1OTk1NzI4YmYzNmZmOTQ6MGJlYmQ0NzU5MzY3NDU5ZmE4NWI0YTZhZjQ0NjE5NDc=';
const BASE_URL = 'https://accounts.spotify.com/api/'


export default class MainScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ZjM4NzgwZGQwMmVmNDE3YmE1OTk1NzI4YmYzNmZmOTQ6MGJlYmQ0NzU5MzY3NDU5ZmE4NWI0YTZhZjQ0NjE5NDc=',
          'Accept': 'application/json',
        },
        body: 'grant_type=client_credentials',
      });
      const tokenResponse = await response.json();
      await AsyncStorage.setItem('@userToken', tokenResponse.access_token);
      // this.props.navigation.setParams({ settingsClick: this._goToSettings, backClicked: null });
      this.props.navigation.dispatch(this.props.navigation.navigate({ routeName: 'playlist' }));
    } catch (error) {
      this.props.navigation.dispatch(this.props.navigation.navigate({ routeName: 'playlist' }));

      console.log('error > ', error)
    }

  }


  render() {
    return (
      <SafeAreaView style={styles.safearea}>
        <StatusBar barStyle={COLOR_SCHEME.LIGHT} backgroundColor={COLOR.PRIMARY_DARK} />
        <View style={styles.useragent}>
        </View>
      </SafeAreaView>
    );
  }
}
