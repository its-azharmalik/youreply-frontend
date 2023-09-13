/* eslint-disable react/prop-types */
import {
	MDBBadge,
	MDBTable,
	MDBTableBody,
	MDBTableHead,
} from 'mdb-react-ui-kit';
import moment from 'moment';
// import { Button } from '@/components/ui/button';
import DialogBox from '../components/DialogBox';
import { Button } from 'react-bootstrap';

const Table = ({ comments, replyHandler, publishReplyHandler }) => {
	return (
		<MDBTable align='middle'>
			<MDBTableHead>
				<tr>
					<th scope='col'>Name</th>
					<th scope='col'>Comment</th>
					<th scope='col'>Tag</th>
					<th scope='col'>Last Updated</th>
					<th scope='col'>Actions</th>
				</tr>
			</MDBTableHead>
			<MDBTableBody>
				{comments?.length > 0 ? (
					comments.map((comment) => {
						return (
							<tr key={comment.id}>
								<td>
									<div className='d-flex align-items-center'>
										<a href={comment.channelLink}>
											<img
												src={comment.avatar}
												alt=''
												style={{ width: '45px', height: '45px' }}
												className='rounded-circle'
											/>
										</a>
										<div className='ms-3'>
											<p className='fw-bold mb-1'>{comment.name}</p>
											<p className='text-muted mb-0'>
												Likes: {comment.likeCount} | Replies:{' '}
												{comment.replyCount}
											</p>
										</div>
									</div>
								</td>
								<td>
									<p className='text-muted mb-0'>
										<strong>
											{moment(comment.publishTime).startOf('day').fromNow()}
										</strong>
									</p>
									<p className='text-muted mb-0'>{comment.text}</p>
								</td>
								<td>
									<MDBBadge color='success' pill>
										Good
									</MDBBadge>
								</td>
								<td>
									<strong>
										{moment(comment.updateTime).startOf('day').fromNow()}
									</strong>
								</td>
								<td>
									{/* <Button
										onClick={() => replyHandler(comment.id)}
										variant='outline'>
										Auto Reply
									</Button> */}
									<DialogBox
										title={'Auto Reply'}
										generateHandler={replyHandler}
										commentId={comment.id}
										comment={comment}
										submitHandler={publishReplyHandler}
										commentText={comment.text}
									/>
								</td>
							</tr>
						);
					})
				) : (
					<tr>
						<td>
							<div className='d-flex align-items-center'>
								<img
									src='https://mdbootstrap.com/img/new/avatars/8.jpg'
									alt=''
									style={{ width: '45px', height: '45px' }}
									className='rounded-circle'
								/>
								<div className='ms-3'>
									<p className='fw-bold mb-1'>John Doe</p>
									<p className='text-muted mb-0'>john.doe@gmail.com</p>
								</div>
							</div>
						</td>
						<td>
							<p className='fw-normal mb-1'>Software engineer</p>
							<p className='text-muted mb-0'>IT department</p>
						</td>
						<td>
							<MDBBadge color='success' pill>
								Good
							</MDBBadge>
						</td>
						<td>Senior</td>
						<td>
							<Button
								onClick={() => replyHandler()}
								color='link'
								rounded
								size='sm'>
								Auto Reply
							</Button>
						</td>
					</tr>
				)}
			</MDBTableBody>
		</MDBTable>
	);
};

export default Table;
