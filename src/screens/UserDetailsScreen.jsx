import React from 'react';
import HomeScreenFunctions from '../functions/HomeScreenFunctions';
import UserInformation from '../components/UserInformation';

const UserDetailsScreen = () => {
	const {
		fetchCommentsHandler,
		videoIDRef,
		userBehaviour,
		setUserBehaviour,
		userInfo,
		// askReplys,
		userPrompt,
	} = HomeScreenFunctions();

	console.log(userPrompt);

	// const setUserDetails = (prompt) => {
	// 	localStorage.setItem('userDetails', JSON.stringify(prompt));
	// };

	return (
		<React.Fragment>
			<div className='d-flex align-items-center m-5'>
				{userInfo?.body?.avatar && (
					<img
						src={userInfo.body.avatar}
						alt=''
						style={{ width: '45px', height: '45px' }}
						className='rounded-circle'
					/>
				)}
				<div className='ms-3'>
					<p className='fw-bold mb-1'>{userInfo?.body.username}</p>
					<p className='text-muted mb-0'>{userInfo?.body.email}</p>
				</div>
			</div>

			<UserInformation
				videoIDRef={videoIDRef}
				fetchCommentsHandler={fetchCommentsHandler}
				userBehaviour={userBehaviour}
				setUserBehaviour={setUserBehaviour}
			/>
		</React.Fragment>
	);
};

export default UserDetailsScreen;
