import React from 'react';
import ReplyComponent from '../components/ReplyComponent';
import HomeScreenFunctions from '../functions/HomeScreenFunctions';
import { Button } from '@/components/ui/button';

const RepliesScreen = () => {
	const { promptReplys, setPromptReplys, magicHandler } = HomeScreenFunctions();

	// const [lock, setLock] = useState(false);
	// Structure of replies state
	// const obj = {
	// 	comment: 'comment',
	// 	reply: 'Hello! This is a sample reply of the above comment',
	// 	replied: true | false,
	// };
	// console.log(obj);

	return (
		<React.Fragment>
			{promptReplys?.length > 0 &&
				promptReplys.map((comment, index) => {
					return (
						<ReplyComponent
							comment={comment}
							promptReplys={promptReplys}
							setPromptReplys={setPromptReplys}
							key={index}
						/>
					);
				})}

			<Button
				// variant='secondary'
				className='m-2'
				onClick={(e) => {
					e.preventDefault();
					magicHandler();
				}}>
				Use AI Magic
			</Button>
		</React.Fragment>
	);
};

export default RepliesScreen;
