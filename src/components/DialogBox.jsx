/* eslint-disable react/prop-types */
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import HomeScreenFunctions from '../functions/HomeScreenFunctions';
import { Textarea } from '@/components/ui/textarea';

const DialogBox = ({
	title,
	submitHandler,
	commentText,
	generateHandler,
	commentId,
	comment,
}) => {
	const [open, setOpen] = useState(false);
	const { repliedComments, isLoading, isError } = HomeScreenFunctions();
	const [formData, setFormData] = useState({
		comment: comment,
		reply: null,
	});

	useEffect(() => {
		if (!isLoading && !isError) {
			setFormData({
				...formData,
				reply: repliedComments?.body?.reply?.choices[0].message.content,
			});
		}
	}, [repliedComments]);

	useEffect(() => {
		if (!isLoading) {
			setOpen(false);
		}
	}, [isError]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				<Button onClick={() => generateHandler(commentId)} variant='outline'>
					{title}
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						submitHandler(formData);
						setOpen(false);
					}}>
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>{commentText}</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='items-center gap-4'>
							<Label htmlFor='name' className='text-right mb-3'>
								AI Generated Reply
							</Label>
							<Textarea
								id='name'
								placeholder='Hello'
								value={
									repliedComments == null
										? 'Generating Your Reply...'
										: formData.reply
								}
								onChange={(e) =>
									setFormData({
										...formData,
										reply: e.target.value,
									})
								}
								className='col-span-3'
								disabled={isLoading || isError}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button disabled={isLoading || isError} type='submit'>
							{isLoading ? 'Loading...' : 'Save changes'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default DialogBox;
