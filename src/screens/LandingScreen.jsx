import { MDBIcon } from 'mdb-react-ui-kit';
// import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import saly from '../assets/saly.png';
// import './shacdn.css';
import './LandingPage.css';
import { DOMAIN } from '../utils/constsnts';

const LandingScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { userInfo, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		if (isSuccess || userInfo) {
			navigate('/');
		}
		dispatch(reset());
	}, [dispatch, isError, isSuccess, message, navigate, userInfo]);

	// const emailRef = useRef();
	// const passwordRef = useRef();

	const googleSubmitHandler = async (e) => {
		e.preventDefault();
		window.open(`${DOMAIN}/api/auth/google`, '_self');
	};

	// const submitHandler = async (e) => {
	// 	e.preventDefault();

	// 	const email = emailRef.current?.value;
	// 	const password = passwordRef.current?.value;
	// 	const userData = {
	// 		email,
	// 		password,
	// 	};
	// 	dispatch(login(userData));
	// };

	return (
		<React.Fragment>
			<div className='landing_container flex-wrap'>
				<div className='left_section max-w-md'>
					<div className='font-bold text-4xl mb-5 '>
						Just Say!{' '}
						<span className='bg-black p-2 rounded'>
							<span className='text-white'>You</span>
							<span className='text-red-500'>Reply</span>
						</span>
					</div>
					<div className='font-medium text-xl mb-2 ml-1 font-serif'>
						<div>Let AI Handle the Replies</div>
						<div>While You Focus on Creating!</div>
					</div>
					<div className='font-light text-sm mb-3 ml-1'>
						AI-driven YouTube comment response tool. Effortlessly engage with
						viewers, save time, and enhance your {"channel's"} interactions and
						growth
					</div>
					<Button
						variant='outline'
						tag='a'
						color='none'
						className='m-1'
						onClick={googleSubmitHandler}
						style={{ color: 'red' }}>
						<MDBIcon fab icon='google' size='md' className='mr-4' /> Get Started
						with Google
					</Button>
				</div>
				<div className='right_section max-w-xl'>
					<img src={saly} />
				</div>
			</div>
		</React.Fragment>
	);
};

export default LandingScreen;
