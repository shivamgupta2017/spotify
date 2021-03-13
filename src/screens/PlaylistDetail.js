'use strict';

import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  SectionList,
  TouchableOpacity,
  Image,
} from 'react-native';

import COLOR from '../styles/Color';
import styles from '../styles/Styles';
import AsyncStorage from '@react-native-community/async-storage';
import COLOR_SCHEME from '../styles/ColorScheme';



const PlaylistDetail = (props) => {
  const [featuredPlayList, setFeaturedPlayList] = useState([{ data: [] }]);

  const goToSongDetailSection = (id) => {

    const findTrackDetails = featuredPlayList[0].data.find((tracks) => tracks.track.id === id);
    props.navigation.dispatch(props.navigation.navigate({
      routeName: 'SongDetails',
      params: { details: findTrackDetails },
    }));

  };
  const Item = ({ title, uri, id, artists, popularity }) => (
    <TouchableOpacity onPress={goToSongDetailSection.bind(undefined, id)}>
      <View style={styles.item}>
        <Image
          style={[styles.tinyLogo, styles.songsLogo]}
          source={{ uri: uri[0].url }}
        />
        <Text style={styles.title}>{title}</Text>
        <Text>popularity:&nbsp;{popularity}</Text>
        {(artists || []).map(({ name, id: artistId }, indx) => <Text key={artistId + indx}>{name}</Text>)}
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    const params = props.navigation.state.params;
    const playlistId = params.id;

    AsyncStorage.getItem('@userToken').then((token) => {
      fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }).then((res) => res.json()).then((response) => {
        console.log('>', response);
        if (response) {
          setFeaturedPlayList([{ data: response.items }]);
        }
      }).catch((err) => {
        console.log('error while fetching playlist .....', err);
      });
    });


  }, [props.navigation.state.params]);


  return (
    <SafeAreaView style={[styles.safearea]}>
      <StatusBar barStyle={Platform.OS === 'ios' ? COLOR_SCHEME.DARK : COLOR_SCHEME.LIGHT}
        backgroundColor={COLOR.PRIMARY_DARK} />

      <View style={styles.container}>
        <SectionList
          sections={featuredPlayList}
          keyExtractor={
            (item, index) => (item.track.id + index)
          }
          renderItem={({ item: { track: { album: { images, artists }, id, popularity, name } } }) => (
            <Item title={name} uri={images} id={id} artists={artists} popularity={popularity} />
          )}
        />
      </View>
    </SafeAreaView>
  );

};

export default PlaylistDetail;
