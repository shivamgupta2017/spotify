'use strict';

import React, { useEffect, useState } from 'react';
import {
	Text,
	Platform,
	StatusBar,
	SectionList,
	Image,
	TouchableOpacity,
	View,
	SafeAreaView,
	BackHandler,
} from 'react-native';
import COLOR_SCHEME from '../styles/ColorScheme';
import COLOR from '../styles/Color';
import styles from '../styles/Styles';
import { fetchPlaylist } from '../manager/SpotifyApiManager';

const handleBackButton = () => true;

const PlayList = (props) => {

	const [featuredPlayList, setFeaturedPlayList] = useState([{ data: [] }]);
	const goToPlayListDetailSection = (id) => {
		props.navigation.dispatch(props.navigation.navigate({
			routeName: 'playlistDetail',
			params: { id },
		}));
	};
	const Item = ({ title, uri, id }) => (
		<TouchableOpacity onPress={goToPlayListDetailSection.bind(undefined, id)}>
			<View style={styles.item}>
				<Image
					style={styles.tinyLogo}
					source={{ uri: uri[0].url }}
				/>
				<Text style={styles.title}>{title}</Text>
			</View>
		</TouchableOpacity>
	);

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', handleBackButton);

		fetchPlaylist().then((response) => {
			console.log('response >', response);
			if (response.error) {
				return;
			}
			setFeaturedPlayList([{ data: response.playlists.items }]);
		}).catch((err) => {
			console.error('error ', err);
		});

		return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
	}, []);
	return (
		<SafeAreaView style={styles.safearea}>
			<StatusBar barStyle={Platform.OS === 'ios' ? COLOR_SCHEME.DARK : COLOR_SCHEME.LIGHT}
				backgroundColor={COLOR.PRIMARY_DARK} />
			<View style={styles.container}>
				<SectionList
					sections={featuredPlayList}
					keyExtractor={({ id }) => id}
					renderItem={({ item }) =>
						<Item title={item.name} uri={item.images} id={item.id} />
					}
				/>
			</View>
		</SafeAreaView>
	);

};

export default PlayList;
