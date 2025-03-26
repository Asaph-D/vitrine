// src/api/imgurApi.js
import axios from 'axios';
import localStorage from 'localStorage';

const CLIENT_ID = '83c29b5e620ade9'; // Remplacez par votre Client ID Imgur
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET'; // Remplacez par votre Client Secret Imgur

const imgurApi = axios.create({
  baseURL: 'https://api.imgur.com/3',
  headers: {
    Authorization: `Client-ID ${CLIENT_ID}`,
  },
});

export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await imgurApi.post('/upload', formData);
  return response.data.data;
};

export const getImageInfo = async (imageHash) => {
  const response = await imgurApi.get(`/image/${imageHash}`);
  return response.data.data;
};

export const getAlbumImages = async (albumHash) => {
  const cachedData = localStorage.getItem(`albumImages_${albumHash}`);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const response = await imgurApi.get(`/album/${albumHash}/images`);
  const data = response.data.data;

  localStorage.setItem(`albumImages_${albumHash}`, JSON.stringify(data));
  return data;
};

const getAccessToken = async () => {
  const token = localStorage.getItem('imgurAccessToken');
  if (token) {
    return token;
  }

  const response = await axios.post('https://api.imgur.com/oauth2/token', null, {
    params: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'client_credentials',
    },
  });

  const accessToken = response.data.access_token;
  localStorage.setItem('imgurAccessToken', accessToken);
  return accessToken;
};
