/*
 * Copyright (c) 2011-2018, Zingaya, Inc. All rights reserved.
 */

'use strict';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from '../screens/MainScreen';
import PlayList from '../screens/PlayList';
import PlaylistDetail from '../screens/PlaylistDetail';
import SongDetails from '../screens/SongDetails'
import COLOR from '../styles/Color';

const AppStack = createStackNavigator(
    {
        Main: {
            screen: MainScreen,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: COLOR.PRIMARY,
                },
                headerTintColor: COLOR.WHITE,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            },
        },
    },
    {
        headerLayoutPreset: 'center',
    }
);

const RootStack = createSwitchNavigator(
    {
        // Login: LoginScreen,
        App: AppStack,
        playlist: PlayList,
        playlistDetail: PlaylistDetail,
        SongDetails: SongDetails,
    },
    {
        initialRouteName: 'App',
    }
);

export default createAppContainer(RootStack);
