import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from './Loading';

const LoginSuccess = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { userInfo, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		dispatch(googleLogin());
		if (!isLoading) {
			if (userInfo && isSuccess) {
				navigate('/user-info');
			} else if (isError) {
				toast.error(message);
				navigate('/login');
			}
		}
	}, [dispatch, isLoading, isError, isSuccess, message, navigate, userInfo]);
	return <Loading textMessage={"Congrat's! you're Logged in.."} />;
};

export default LoginSuccess;
