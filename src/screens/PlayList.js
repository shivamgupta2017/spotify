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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import COLOR_SCHEME from '../styles/ColorScheme';
import COLOR from '../styles/Color';
import styles from '../styles/Styles';

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
		AsyncStorage.getItem('@userToken')
			.then((token) => {
				console.log('token >', token);

				fetch('https://api.spotify.com/v1/browse/featured-playlists?country=IN&locale=en-IN', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'accept': 'application/json',
						Authorization: 'Bearer ' + token,
					},
				}).then((res) => res.json()).then((response) => {
					setFeaturedPlayList([{ data: response.playlists.items }]);
				}).catch((err) => {
					console.log('error while fetching playlist .....', err);
				});

			}).catch((err) => { console.log(err); });
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
