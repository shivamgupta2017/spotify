import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Platform,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/Styles';
import COLOR_SCHEME from '../styles/ColorScheme';
import COLOR from '../styles/Color';

const SongDetails = (props) => {
  const [songDetail, setSongDetail] = useState(null);

  useEffect(() => {
    const params = props.navigation.state.params;
    setSongDetail(params.details.track);
  }, [props.navigation.state.params]);

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar barStyle={Platform.OS === 'ios' ? COLOR_SCHEME.DARK : COLOR_SCHEME.LIGHT}
        backgroundColor={COLOR.PRIMARY_DARK} />
      <View style={styles.container}>
        {songDetail && (
          <TouchableOpacity>
            <View style={styles.item}>
              <Image
                style={styles.songsDetailedLogo}
                source={{ uri: songDetail.album.images[0].url }}
              />
              <Text>{songDetail.name}</Text>

              {((songDetail.album.artists || []).map((artist) =>
                <Text key={artist.id}>{artist.name}</Text>)
              )}

              <Text>{songDetail.album.name}</Text>


            </View>
          </TouchableOpacity>
        )}

      </View>
    </SafeAreaView>
  )
}

export default SongDetails;
