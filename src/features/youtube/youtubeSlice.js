import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import youtubeService from './youtubeService';

const initialState = {
	youtubeVideos: localStorage.getItem('youtubeVideos')
		? JSON.parse(localStorage.getItem('youtubeVideos'))
		: null,
	youtubeComments: localStorage.getItem('youtubeComments')
		? JSON.parse(localStorage.getItem('youtubeComments'))
		: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	error: null,
	message: '',
	repliedComments: localStorage.getItem('repliedComments')
		? JSON.parse(localStorage.getItem('repliedComments'))
		: null,
};

// Fetch Videos using Search Query
export const fetchVideos = createAsyncThunk(
	'youtube/videos',
	async (searchQuery, thunkAPI) => {
		try {
			return await youtubeService.fetchVideos(searchQuery);
		} catch (error) {
			console.log(error);
			const message = error.response.data.error;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Fetch Comments using VIDEO ID
export const fetchComments = createAsyncThunk(
	'youtube/comments',
	async (videoID, thunkAPI) => {
		try {
			return await youtubeService.fetchCommentsID(videoID);
		} catch (error) {
			console.log(error);
			const message = error.response.data.error;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Generate Reply for the Comment Using AI from Backend
export const generateReply = createAsyncThunk(
	'youtube/generateReply',
	async (data, thunkAPI) => {
		try {
			const response = await youtubeService.generateReply(data);
			console.log(response);
			return response;
		} catch (error) {
			console.log(error);
			const message = error.response.data.error;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Publish the generated Reply on Youtube
export const publishOnYoutube = createAsyncThunk(
	'youtube/publishOnYoutube',
	async (data, thunkAPI) => {
		try {
			const response = await youtubeService.publishOnYoutube(data);
			console.log(response);
			return response;
		} catch (error) {
			console.log(error);
			const message = error.response.data.error;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

const youtubeSlice = createSlice({
	name: 'youtube',
	initialState,
	reducers: {
		setComments(state, action) {
			state.youtubeComments = action.payload;
			localStorage.setItem('youtubeComments', JSON.stringify(action.payload));
		},
	},
	extraReducers: (builder) => {
		builder
			//fetchVideos
			.addCase(fetchVideos.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchVideos.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.youtubeVideos = action.payload;
				state.message = action.payload.message;
			})
			.addCase(fetchVideos.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.youtubeVideos = null;
			})
			// fetchComments
			.addCase(fetchComments.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchComments.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.youtubeComments = action.payload;
				state.message = action.payload.message;
			})
			.addCase(fetchComments.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.youtubeComments = null;
			})
			// generateReply
			.addCase(generateReply.pending, (state) => {
				state.isLoading = true;
				state.repliedComments = null;
			})
			.addCase(generateReply.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.repliedComments = action.payload;
				state.message = action.payload.message;
			})
			.addCase(generateReply.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			// publishOnYoutube
			.addCase(publishOnYoutube.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(publishOnYoutube.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.message = action.payload.message;
			})
			.addCase(publishOnYoutube.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { setCcomments } = youtubeSlice.actions;
export default youtubeSlice.reducer;
