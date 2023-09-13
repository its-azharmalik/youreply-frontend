/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LinkContainer } from 'react-router-bootstrap';
import { FaComment, FaMagic, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';

export function UserNav({ logoutHandler, profilepic, email, name }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='relative h-8 w-8 rounded-full p-0'>
					<Avatar className='h-8 w-8'>
						<AvatarImage src={profilepic} alt='@shadcn' />
						<AvatarFallback>=</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end' forceMount>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm font-medium leading-none'>{name}</p>
						<p className='text-xs leading-none text-muted-foreground'>
							{email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<LinkContainer to={'/user-info'}>
						<DropdownMenuItem>
							<FaUserAlt className='mr-2' />
							Profile
						</DropdownMenuItem>
					</LinkContainer>
					<LinkContainer to={'/'}>
						<DropdownMenuItem>
							<FaMagic className='mr-2' /> Dashboard
						</DropdownMenuItem>
					</LinkContainer>
					<LinkContainer to={'/sample-replies'}>
						<DropdownMenuItem>
							<FaComment className='mr-2' /> Edit Replies
						</DropdownMenuItem>
					</LinkContainer>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />

				<Button
					variant='ghost'
					className='w-full text-left'
					onClick={(e) => {
						logoutHandler(e);
					}}>
					<FaSignOutAlt className='mr-2' />
					Log out
				</Button>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
