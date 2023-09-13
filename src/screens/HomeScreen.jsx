import React from 'react';

import Table from '../components/Table';
import HomeScreenFunctions from '../functions/HomeScreenFunctions';
import AlertDialogBox from '../components/AlertDialog';
// import PublishComponent from '../components/PublishComponent';

const HomeScreen = () => {
	const {
		comments,
		replyHandler,
		publishReplyHandler,
		isLoading,
		isError,
		message,
	} = HomeScreenFunctions();

	return (
		<React.Fragment>
			{!isLoading && isError && <AlertDialogBox text={message} />}
			<Table
				comments={comments}
				replyHandler={replyHandler}
				publishReplyHandler={publishReplyHandler}
			/>
		</React.Fragment>
	);
};

export default HomeScreen;
