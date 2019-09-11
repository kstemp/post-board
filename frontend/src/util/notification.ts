import { toast } from 'react-toastify';

export const displayErrorNotification = (message: string) => {
	toast.error(message, {
		autoClose: 3000,
		hideProgressBar: true,
		closeButton: false
	});
};
