import axios from 'axios';

const API_URL = '/api/auth';

// Regsiter User
const register = async (userData) => {
	const response = await axios.post(API_URL + '/signup', userData);
	if (response.data) {
		localStorage.setItem('userInfo', JSON.stringify(response.data));
	}
	return response.data;
};

// Login User
const login = async (userData) => {
	const response = await axios.post(API_URL + '/login', userData);
	if (response.data) {
		localStorage.setItem('userInfo', JSON.stringify(response.data));
	}
	return response.data;
};

// Google Login User
const googleLogin = async () => {
	const response = await axios.get('/api/users/', { withCredentials: true });
	if (response.data) {
		localStorage.setItem('userInfo', JSON.stringify(response.data));
	}
	return response.data;
};

// logout

const fullLogout = async () => {
	const response = await axios.get('/api/auth/logout', {
		withCredentials: true,
	});

	return response.data;
};

const authService = {
	register,
	login,
	googleLogin,
	fullLogout,
};

export default authService;
