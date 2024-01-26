/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { fetchVideos } from '../features/youtube/youtubeSlice';
import VideosList from './VideoList';

const UserInformation = ({
	selectedVideo,
	setSelectedVideo,
	fetchCommentsHandler,
	userBehaviour,
	setUserBehaviour,
}) => {
	const userPrompt = JSON.parse(localStorage.getItem('userPrompt'));
	const youtubeVideos = useSelector((state) => state.youtube.youtubeVideos);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchVideos());
	}, [dispatch]);

	useEffect(() => {
		setUserBehaviour(userPrompt?.userBehaviour);
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
						<Label className='m-2 mt-4 mb-4 ml-2'>
							Select Video to Analyse
						</Label>
						<VideosList
							videos={youtubeVideos?.body?.videos}
							selectedVideo={selectedVideo}
							setSelectedVideo={setSelectedVideo}
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
