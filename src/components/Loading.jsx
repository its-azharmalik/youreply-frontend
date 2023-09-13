/* eslint-disable react/prop-types */
const Loading = ({ textMessage, error }) => {
	return (
		<div className={error ? 'error' : 'success'}>{textMessage} Loading...</div>
	);
};

export default Loading;
