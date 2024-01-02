import {
	MDBBtn,
	MDBCheckbox,
	MDBContainer,
	MDBIcon,
	MDBInput,
} from 'mdb-react-ui-kit';
import FormContainer from '../components/FormContainer';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { userInfo, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}
		if (isSuccess || userInfo) {
			navigate('/');
		} else {
			dispatch(reset());
		}
	}, [userInfo, isLoading, isError, isSuccess, navigate, message]);

	const submitHandler = (e) => {
		e.preventDefault();
		const data = {
			name: nameRef?.current?.value,
			email: emailRef?.current?.value,
			password: passwordRef?.current?.value,
			confirmPassword: confirmPasswordRef?.current?.value,
		};
		console.log(data);

		if (data.confirmPassword !== data.password) {
			toast.error('Passwords do not match');
		} else {
			const userData = {
				name: data.name,
				Button: data?.email,
				email: data.email,
				password: data.password,
			};
			dispatch(register(userData));
		}
	};

	const googleSubmitHandler = async (e) => {
		e.preventDefault();
		window.open('https://api.youreply.tech/api/auth/google', '_self');
	};

	return (
		<FormContainer>
			<MDBContainer className='p-3 my-5 d-flex flex-column w-50'>
				<div className='text-center mb-3'>
					<p>Sign un with:</p>

					<div
						className='d-flex justify-content-between mx-auto'
						style={{ width: '40%' }}>
						{/* <MDBBtn
							tag='a'
							color='none'
							className='m-1'
							style={{ color: '#1266f1' }}>
							<MDBIcon fab icon='facebook-f' size='sm' />
						</MDBBtn>

						<MDBBtn
							tag='a'
							color='none'
							className='m-1'
							style={{ color: '#1266f1' }}>
							<MDBIcon fab icon='twitter' size='sm' />
						</MDBBtn> */}

						<MDBBtn
							tag='a'
							color='none'
							className='m-1'
							onClick={googleSubmitHandler}
							style={{ color: '#1266f1' }}>
							<MDBIcon fab icon='google' size='sm' />
						</MDBBtn>

						{/* <MDBBtn
							tag='a'
							color='none'
							className='m-1'
							style={{ color: '#1266f1' }}>
							<MDBIcon fab icon='github' size='sm' />
						</MDBBtn> */}
					</div>

					<p className='text-center mt-3'>or:</p>
				</div>
				<form onSubmit={submitHandler}>
					<MDBInput
						wrapperClass='mb-4'
						label='Name'
						ref={nameRef}
						id='form1'
						type='text'
						required={true}
					/>
					<MDBInput
						wrapperClass='mb-4'
						label='Email'
						id='form1'
						ref={emailRef}
						type='email'
						required={true}
					/>
					<MDBInput
						wrapperClass='mb-4'
						label='Password'
						id='form1'
						type='password'
						ref={passwordRef}
						required={true}
					/>
					<MDBInput
						wrapperClass='mb-4'
						label='Confirm Password'
						id='form1'
						type='password'
						required={true}
						ref={confirmPasswordRef}
					/>

					<div className='d-flex justify-content-center mb-4'>
						<MDBCheckbox
							name='flexCheck'
							id='flexCheckDefault'
							label='I have read and agree to the terms'
						/>
					</div>

					<MDBBtn className='mb-4 w-100' type='submit' disabled={isLoading}>
						{isLoading ? 'Loading...' : 'Sign up'}
					</MDBBtn>
				</form>
			</MDBContainer>
		</FormContainer>
	);
};

export default RegisterScreen;
