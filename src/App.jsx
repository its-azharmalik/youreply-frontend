import React from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from '@/components/ui/toaster';

const App = () => {
	return (
		<React.Fragment>
			<ToastContainer />
			<Header />
			<Container className='my-3'>
				<Outlet />
			</Container>
			<Toaster />
		</React.Fragment>
	);
};

export default App;
