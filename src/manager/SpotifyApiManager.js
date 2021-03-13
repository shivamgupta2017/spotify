import config from '../config.json';
import AsyncStorage from '@react-native-community/async-storage';

const authHeader = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Authorization': config.encodedIdSecret,
  'Accept': 'application/json',
};

const regularHeader = (token) => ({
  'Content-Type': 'application/json',
  'accept': 'application/json',
  Authorization: 'Bearer ' + token,
});

export const getDeviceAuthenticated = async () => {
  const response = await fetch(`${config.BASE_AUTH_URL}api/token`, {
    method: 'POST',
    headers: authHeader,
    body: 'grant_type=client_credentials',
  });
  const tokenResponse = await response.json();
  console.log('token registered: ', tokenResponse.access_token);
  await AsyncStorage.setItem('@userToken', tokenResponse.access_token);
};


export const fetchPlaylist = async () => {
  const token = await AsyncStorage.getItem('@userToken');
  const response = await fetch(`${config.BASE_URL}v1/browse/featured-playlists?country=IN&locale=en-IN`, {
    method: 'GET',
    headers: regularHeader(token),
  });
  const playlistResponse = await response.json();
  return playlistResponse;
};

export const fetchPlaylistTracks = async (playlistId) => {
  const token = await AsyncStorage.getItem('@userToken');
  const response = await fetch(`${config.BASE_URL}v1/playlists/${playlistId}/tracks`, {
    method: 'GET',
    headers: regularHeader(token),
  });
  return await response.json();
};


