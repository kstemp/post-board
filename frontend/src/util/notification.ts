import { toast } from 'react-toastify';

export const displayErrorNotification = (title: string, message: string) => {
	toast.error(`${title} - ${message}`, {
		autoClose: 3000,
		hideProgressBar: true,
		closeButton: false
	});
};
