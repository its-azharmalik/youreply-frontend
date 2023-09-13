import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authServices';

const initialState = {
	userInfo: localStorage.getItem('userInfo')
		? JSON.parse(localStorage.getItem('userInfo'))
		: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	error: null,
	message: '',
};

// Register a user
export const register = createAsyncThunk(
	'auth/register',
	async (user, thunkAPI) => {
		try {
			return await authService.register(user);
		} catch (error) {
			const message = error.response.data.error;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Login a user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
	try {
		return await authService.login(user);
	} catch (error) {
		const message = error.response.data.error;
		return thunkAPI.rejectWithValue(message);
	}
});
// Google Login

export const googleLogin = createAsyncThunk(
	'auth/google/user',
	async (thunkAPI) => {
		try {
			return await authService.googleLogin();
		} catch (error) {
			const message = error.response.data.error;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const fullLogout = createAsyncThunk('/auth/logout', async (thunkAPI) => {
	try {
		return await authService.fullLogout();
	} catch (error) {
		const message = error.response.data.error;
		console.log(error);
		return thunkAPI.rejectWithValue(message);
	}
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentails(state, action) {
			state.userInfo = action.payload;
			localStorage.setItem('userInfo', JSON.stringify(action.payload));
		},
		logout(state) {
			state.userInfo = null;
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.message = '';
			localStorage.removeItem('userInfo');
		},
		reset(state) {
			state.isLoading = false;
			state.isError = false;
		},
	},
	extraReducers: (builder) => {
		// register
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.userInfo = action.payload;
				state.message = action.payload.message;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.userInfo = null;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.userInfo = action.payload;
				state.message = action.payload.message;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.userInfo = null;
			})
			.addCase(googleLogin.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(googleLogin.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.userInfo = action.payload;
				state.message = action.payload.message;
			})
			.addCase(googleLogin.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.userInfo = null;
			})
			.addCase(fullLogout.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fullLogout.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.message = action.payload.message;
			})
			.addCase(fullLogout.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.userInfo = null;
			});
	},
});

export const { setCredentails, logout, reset } = authSlice.actions;
export default authSlice.reducer;
