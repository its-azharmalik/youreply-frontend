/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const ReplyComponent = ({ comment, promptReplys }) => {
	// Basic Imports
	let userPrompt = JSON.parse(localStorage.getItem('userPrompt'));

	// States
	const [lock, setLock] = useState(false);

	// Refrences
	let replyRef = useRef();

	// Effects
	useEffect(() => {
		const currentReply = userPrompt.replys.find(
			(item) => item.comment.id == comment.id
		);
		replyRef.current.value = currentReply.replys;
		setLock(currentReply.replied);
	}, []);

	// Handler Functions
	const submitHandler = (e) => {
		e.preventDefault();
		if (!lock) {
			const replies = [...promptReplys];
			const currentReply = replies.find(
				(item) => item.comment.id == comment.id
			);
			currentReply.replys = replyRef.current?.value;
			currentReply.replied = true;
			setLock(true);
			userPrompt.replys = promptReplys;
			localStorage.setItem('userPrompt', JSON.stringify(userPrompt));
		} else {
			setLock(false);
		}
	};

	return (
		<React.Fragment>
			<Card className='m-2'>
				<CardHeader>
					<CardTitle>{comment.comment.name}</CardTitle>
					<CardDescription>{comment.comment.text}</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={submitHandler}>
						<Textarea
							className='mb-2 mt-2'
							label='Give us an example reply of the above Comment!'
							rows={4}
							required={true}
							ref={replyRef}
							disabled={lock}
						/>
						<Button variant='outline' type='submit'>
							{lock ? 'Edit' : 'Reply'}
						</Button>
					</form>
				</CardContent>
			</Card>
		</React.Fragment>
	);
};

export default ReplyComponent;
