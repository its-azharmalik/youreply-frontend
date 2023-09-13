/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const UserInformation = ({
	videoIDRef,
	fetchCommentsHandler,
	userBehaviour,
	setUserBehaviour,
}) => {
	const userPrompt = JSON.parse(localStorage.getItem('userPrompt'));
	const youtubeComments = useSelector((state) => state.youtube.youtubeComments);
	useEffect(() => {
		setUserBehaviour(userPrompt?.userBehaviour);
		videoIDRef.current.value =
			youtubeComments?.body?.data.length > 0
				? youtubeComments?.body?.data[0].videoId
				: '';
	}, []);

	return (
		<React.Fragment>
			<Card className='m-4 l-12'>
				<CardHeader>
					<CardTitle>Basic Information</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={fetchCommentsHandler}>
						<Label className='m-2'>What you want to feel while replying?</Label>
						<Textarea
							label='Please Describe Yourself.. Who are you?.. What videos you create on youtube? and the description of the video you want to Analyze?'
							rows={8}
							required={true}
							value={userBehaviour}
							onChange={(e) => setUserBehaviour(e.target.value)}
						/>
						<Label className='mb-2 mt-4 ml-2'>Video Link</Label>
						<Input
							className='mb-2'
							label='Enter Video ID'
							id='form1'
							type='text'
							required={true}
							ref={videoIDRef}
						/>

						<Button
							type='submit'
							className='mt-4'>{`Let's Analyse Comments`}</Button>
					</form>
				</CardContent>
			</Card>
		</React.Fragment>
	);
};

export default UserInformation;
