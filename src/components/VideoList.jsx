import React, { useState } from 'react';

const VideoList = ({ videos, selectedVideo, setSelectedVideo }) => {
	const handleVideoSelect = (video) => {
		setSelectedVideo(video);
	};

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
			{videos
				? videos.map((video) => (
						<div
							key={video.id.videoId}
							className={`p-2 bg-white rounded shadow cursor-pointer ${
								selectedVideo === video ? 'border-2 border-black' : ''
							}`}
							onClick={() => handleVideoSelect(video)}>
							<img
								src={video.snippet.thumbnails.medium.url}
								alt={video.snippet.title}
								className='mb-2 rounded'
							/>
							<span className='text-sm'>{video.snippet.title}</span>
						</div>
				  ))
				: 'No Videos Present'}
		</div>
	);
};

export default VideoList;
