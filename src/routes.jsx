import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import App from './App';
import HomeScreen from './screens/HomeScreen';
import LandingScreen from './screens/LandingScreen';
// import RegisterScreen from './screens/RegisterScreen';
import PrivateRoute from './components/PrivateRoute';
import LoginSuccess from './components/LoginSuccess';
import LoginFailure from './components/LoginFailure';
import UserDetailsScreen from './screens/UserDetailsScreen';
import RepliesScreen from './screens/RepliesScreen';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<App />}>
			<Route path='/login' element={<LandingScreen />} />
			<Route path='/login/failure' element={<LoginFailure />} />
			{/* <Route path='/register' element={<RegisterScreen />} /> */}
			<Route path='/login/success' element={<LoginSuccess />} />

			<Route path='' element={<PrivateRoute />}>
				<Route path='/' element={<HomeScreen />} />
				<Route path='/user-info' element={<UserDetailsScreen />} />
				<Route path='/sample-replies' element={<RepliesScreen />} />
			</Route>
		</Route>
	)
);

export default router;
