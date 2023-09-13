import { useEffect, useRef, useState } from 'react';
import {
	fetchComments,
	generateReply,
	publishOnYoutube,
} from '../features/youtube/youtubeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { refactorReplyPrompt } from '../utils/refactor';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const HomeScreenFunctions = () => {
	// Fetch Comments using VIDEO ID
	const [comments, setComments] = useState([]);
	const [promptReplys, setPromptReplys] = useState([]);
	const [userBehaviour, setUserBehaviour] = useState('');

	const userInfo = useSelector((state) => state.auth.userInfo);
	const youtubeComments = useSelector((state) => state.youtube.youtubeComments);
	const { repliedComments, isLoading, isError, message } = useSelector(
		(state) => state.youtube
	);
	const userPrompt = JSON.parse(localStorage.getItem('userPrompt'));
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { toast } = useToast();

	const videoIDRef = useRef();

	const fetchCommentsHandler = async (e) => {
		e?.preventDefault();
		let checkUserPrompt = JSON.parse(localStorage.getItem('userPrompt'));
		console.log(checkUserPrompt);
		if (checkUserPrompt) {
			checkUserPrompt.userBehaviour = userBehaviour;
			localStorage.setItem('userPrompt', JSON.stringify(checkUserPrompt));
		} else {
			const prompt = {
				userBehaviour: userBehaviour,
				replys: [],
			};
			localStorage.setItem('userPrompt', JSON.stringify(prompt));
		}
		let userPrompt = JSON.parse(localStorage.getItem('userPrompt'));

		const videoID = videoIDRef.current?.value;
		if (videoID) {
			const ans = await dispatch(
				fetchComments({
					videoID: videoID,
					userId: userInfo.body._id,
					prompt: userPrompt,
				})
			);
			if (
				ans?.error?.message == 'Rejected' ||
				ans?.payload == 'No Comments Found'
			) {
				console.log(ans);
				toast({
					title: 'Error',
					description: ans.payload || ans.error.message,
					variant: 'destructive',
				});
			} else {
				console.log(ans);
				navigate('/sample-replies');
			}
		}
	};

	const magicHandler = () => {
		const userPrompt = JSON.parse(localStorage.getItem('userPrompt'));
		if (
			userPrompt?.replys[0]?.replied &&
			userPrompt?.replys[1]?.replied &&
			userPrompt?.replys[2]?.replied
		) {
			navigate('/');
		}
	};

	const replyHandler = async (commentId) => {
		console.log('Reply Handler', commentId);
		// Use this comment Id to send this to backend with all the prompt to make a api call for an AI generated Response for this comment
		dispatch(
			generateReply({
				userId: userInfo.body._id,
				comment: commentId,
				prompt: userPrompt,
				words: 5,
			})
		);
	};

	const publishReplyHandler = async (data) => {
		// Use this comment Id to send this to backend with all the prompt to make a api call for an AI generated Response for this comment
		const ans = await dispatch(
			publishOnYoutube({
				commentId: data.comment.actualCommentId,
				commentText: data.reply,
				comment: data.comment.id,
			})
		);
		console.log(ans);
		if (ans?.error?.message == 'Rejected') {
			toast({
				title: 'Error',
				description: ans.payload || ans.error.message,
				variant: 'destructive',
			});
		} else {
			toast({
				title: 'Success',
				description: 'You have replied Successfully to this comment!',
				variant: 'success',
			});
		}
	};

	useEffect(() => {
		const tempArr = [];
		youtubeComments?.body?.data.map((comment) => {
			const obj = {
				id: comment._id,
				name: comment.commentedUser.authorDisplayName,
				avatar: comment.commentedUser.authorProfileImageUrl,
				text: comment.commentText,
				likeCount: comment.likeCount,
				publishTime: comment.publishedAt,
				updateTime: comment.updatedAt,
				replyCount: comment.replyCount,
				channelLink: comment.commentedUser.authorChannelUrl,
				videoId: comment.videoId,
				actualCommentId: comment.actualCommentId,
			};
			tempArr.push(obj);
		});
		setComments(tempArr);
	}, [youtubeComments]);

	useEffect(() => {
		refactorReplyPrompt(comments, toast);
		const arr = JSON.parse(localStorage.getItem('userPrompt'))?.replys;
		setPromptReplys(arr);
	}, [comments]);

	return {
		fetchCommentsHandler,
		videoIDRef,
		userInfo,
		promptReplys,
		comments,
		// askReplys,
		userBehaviour,
		setUserBehaviour,
		userPrompt,
		navigate,
		magicHandler,
		setPromptReplys,
		replyHandler,
		publishReplyHandler,
		repliedComments,
		isLoading,
		isError,
		message,
	};
};

export default HomeScreenFunctions;
