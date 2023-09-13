import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const IntermediateRoutes = () => {
	const { userInfo } = useSelector((state) => state.auth);

	return userInfo ? <Outlet /> : <Navigate to='/update-details' replace />;
};

export default IntermediateRoutes;
