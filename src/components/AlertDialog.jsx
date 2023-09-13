/* eslint-disable react/prop-types */
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useNavigate } from 'react-router-dom';

const AlertDialogBox = ({ text }) => {
	const naviagte = useNavigate();
	return (
		<AlertDialog defaultOpen={true}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Backend Error</AlertDialogTitle>
					<AlertDialogDescription>{text}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => naviagte('/')}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction onClick={() => naviagte('/')}>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default AlertDialogBox;
