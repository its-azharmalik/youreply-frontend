import { useEffect } from 'react';

const LoginFailure = () => {
	useEffect(() => {
		window.close();
	}, []);
	return <div>Login Failure</div>;
};

export default LoginFailure;
