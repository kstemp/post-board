import { toast } from 'react-toastify';

export const displayErrorNotification = (message: string) => {
	toast.dismiss();
	toast.error(message, {
		autoClose: 3000,
		hideProgressBar: true,
		closeButton: false,
		position: toast.POSITION.BOTTOM_CENTER
	});
};
