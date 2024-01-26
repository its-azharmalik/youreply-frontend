import axios from 'axios';
import { DOMAIN } from '../../utils/constsnts';

const API_URL = `${DOMAIN}/api/youtube`;

// Fetch Videos using Search Query
const fetchVideos = async (searchQuery) => {
	const response = await axios.post(
		API_URL + '/get-my-videos',
		{ searchQuery },
		{
			withCredentials: true,
		}
	);
	if (response.data) {
		localStorage.setItem('youtubeVideos', JSON.stringify(response.data));
	}
	return response.data;
};

// Fetch Comments with Video ID
const fetchCommentsID = async (videoID) => {
	const response = await axios.post(
		API_URL + '/comments',
		{ videoID },
		{
			withCredentials: true,
		}
	);
	if (response.data) {
		localStorage.setItem('youtubeComments', JSON.stringify(response.data));
	}
	return response.data;
};

// Generate Reply for the Comment Using AI from Backend
const generateReply = async (data) => {
	const response = await axios.post(API_URL + '/generateReply', data, {
		withCredentials: true,
	});
	return response.data;
};

// Publish that Reply on Youtube
const publishOnYoutube = async (data) => {
	const response = await axios.post(API_URL + '/publishReplyToYoutbe', data, {
		withCredentials: true,
	});
	return response.data;
};

// // Login User
// const login = async (userData) => {
// 	const response = await axios.post(API_URL + '/login', userData);
// 	if (response.data) {
// 		localStorage.setItem('userInfo', JSON.stringify(response.data));
// 	}
// 	return response.data;
// };

// // Google Login User
// const fetchComments = async () => {
// 	const response = await axios.get('/api/users/', { withCredentials: true });
// 	if (response.data) {
// 		localStorage.setItem('userInfo', JSON.stringify(response.data));
// 	}
// 	return response.data;
// };

const youtubeService = {
	fetchVideos,
	fetchCommentsID,
	generateReply,
	publishOnYoutube,
};

export default youtubeService;
