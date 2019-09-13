import { toast } from 'react-toastify';

export const formatResponse = (response: Response) =>
	`${response.status}: ${response.statusText}`;

const toastOptions = {
	autoClose: 3000,
	hideProgressBar: true,
	closeButton: false,
	position: toast.POSITION.BOTTOM_CENTER
};

export const displayErrorNotification = (message: string) =>
	toast.error(message, toastOptions);

export const displaySuccessNotification = (message: string) =>
	toast.success(message, toastOptions);
