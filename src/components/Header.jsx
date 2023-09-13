import { Container, Navbar } from 'react-bootstrap';
import { UserNav } from './Navbar';
// import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
// import { useNavigate } from 'react-router-dom';
import { logout, fullLogout } from '../features/auth/authSlice';

const Header = () => {
	// Redux States
	const { userInfo } = useSelector((state) => state.auth);

	// Hook Usage
	const dispatch = useDispatch();
	// const naviagte = useNavigate();

	// Handler Functions
	const logoutHandler = (e) => {
		e.preventDefault();
		dispatch(logout());
		dispatch(fullLogout());
		window.location.reload();
	};
	return (
		<header>
			<Navbar bg='black' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>
							<span className='text-white'>You</span>
							<span className='text-red-500'>Reply</span>
						</Navbar.Brand>
					</LinkContainer>
					{
						userInfo && (
							<UserNav
								logoutHandler={logoutHandler}
								profilepic={userInfo?.body?.avatar}
								email={userInfo?.body?.email}
								name={userInfo?.body?.username}
							/>
						)
						// <Nav className='ms-auto'>
						// 	<LinkContainer to='/login'>
						// 		<Nav.Link>
						// 			<FaSignInAlt /> Sign In
						// 		</Nav.Link>
						// 	</LinkContainer>
						// 	<LinkContainer to='/register'>
						// 		<Nav.Link>
						// 			<FaSignOutAlt /> Sign Up
						// 		</Nav.Link>
						// 	</LinkContainer>
						// </Nav>
					}

					{/* <Navbar.Toggle aria-controls='basic-navbar-nav' /> */}
					{/* <Navbar.Collapse id='basic-navbar-nav'>
						{userInfo ? (
							<Nav className='ms-auto'>
								<LinkContainer to='/'>
									<Nav.Link>
										<FaMagic /> Dashboard
									</Nav.Link>
								</LinkContainer>

								<LinkContainer to='/user-info'>
									<Nav.Link>
										<FaUserAlt /> Profile
									</Nav.Link>
								</LinkContainer>

								<LinkContainer to='/sample-replies'>
									<Nav.Link>
										<FaComment /> Edit Replies
									</Nav.Link>
								</LinkContainer>

								<Nav.Link onClick={logoutHandler}>
									<FaSignOutAlt /> Logout
								</Nav.Link>
							</Nav>
						) : (
							<Nav className='ms-auto'>
								<LinkContainer to='/login'>
									<Nav.Link>
										<FaSignInAlt /> Sign In
									</Nav.Link>
								</LinkContainer>

								<LinkContainer to='/register'>
									<Nav.Link>
										<FaSignOutAlt /> Sign Up
									</Nav.Link>
								</LinkContainer>
							</Nav>
						)}
					</Navbar.Collapse> */}
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
