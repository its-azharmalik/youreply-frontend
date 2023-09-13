import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import youtubeReducer from './features/youtube/youtubeSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		youtube: youtubeReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
	devTools: true,
});

export default store;
