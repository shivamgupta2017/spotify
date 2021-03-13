'use strict';

import React from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import COLOR from '../styles/Color';
import COLOR_SCHEME from '../styles/ColorScheme';
import styles from '../styles/Styles';
import { getDeviceAuthenticated } from '../manager/SpotifyApiManager';

export default class MainScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    try {
     await getDeviceAuthenticated();
      // this.props.navigation.setParams({ settingsClick: this._goToSettings, backClicked: null });
      this.props.navigation.dispatch(this.props.navigation.navigate({ routeName: 'playlist' }));
    } catch (error) {
      console.error('unexpected error');
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
