import { toast } from 'react-toastify';
import { FetchError } from '../entities/entity';

const toastOptions = {
	autoClose: 3000,
	hideProgressBar: true,
	closeButton: false,
	position: toast.POSITION.TOP_CENTER
};

export const formatErrorResponse = (statusCode: number, statusText: string) =>
	`${statusCode}: ${statusText}`;

export const displayErrorNotification = (
	message: string,
	error: FetchError
) => {
	toast.dismiss();
	return toast.error(`${message} (${error.message})`, toastOptions);
};

export const displaySuccessNotification = (message: string) =>
	toast.success(message, toastOptions);
