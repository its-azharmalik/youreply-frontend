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
		window.open('https://api.youreply.tech/api/auth/google', '_self');
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
		// <FormContainer>
		// 	<h1 className='heading mt-5'>Sign In</h1>
		// 	 <form onSubmit={submitHandler}>
		// 		<MDBContainer className='p-3 my-5 d-flex flex-column w-50'>
		// 			<Input
		// 				ref={emailRef}
		// 				wrapperClass='mb-4'
		// 				label='Email address'
		// 				id='form1'
		// 				type='email'
		// 				required={true}
		// 			/>
		// 			<MDBInput
		// 				ref={passwordRef}
		// 				wrapperClass='mb-4'
		// 				label='Password'
		// 				id='form2'
		// 				type='password'
		// 				required={true}
		// 			/>

		// 			<div className='d-flex justify-content-between mx-3 mb-4'>
		// 				<MDBCheckbox
		// 					name='flexCheck'
		// 					value=''
		// 					id='flexCheckDefault'
		// 					label='Remember me'
		// 				/>
		// 				<a href='!#'>Forgot password?</a>
		// 			</div>

		// 			<Button type='submit' disabled={isLoading} className='mb-4'>
		// 				{isLoading ? 'Loading...' : 'Sign In'}
		// 			</Button>

		// 			<div className='text-center'>
		// 				<p>
		// 					Not a member? <Link to='/register'>Register</Link>
		// 				</p>
		// 				<p>or sign up with:</p>

		// 				<div
		// 					className='d-flex justify-content-between mx-auto'
		// 					style={{ width: '40%' }}>
		// 					{/* <MDBBtn
		// 						tag='a'
		// 						color='none'
		// 						className='m-1'
		// 						style={{ color: '#1266f1' }}>
		// 						<MDBIcon fab icon='facebook-f' size='sm' />
		// 					</MDBBtn>

		// 					<MDBBtn
		// 						tag='a'
		// 						color='none'
		// 						className='m-1'
		// 						style={{ color: '#1266f1' }}>
		// 						<MDBIcon fab icon='twitter' size='sm' />
		// 					</MDBBtn>

		// 					<MDBBtn
		// 						tag='a'
		// 						color='none'
		// 						className='m-1'
		// 						style={{ color: '#1266f1' }}>
		// 						<MDBIcon fab icon='github' size='sm' />
		// 					</MDBBtn>
		// 				</div>
		// 			</div>
		// 		</MDBContainer>
		// 	</form>

		// </FormContainer>
	);
};

export default LandingScreen;
