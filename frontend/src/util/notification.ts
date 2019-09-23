import { toast } from 'react-toastify';
import { FetchErrorResponse } from '../entities/entity';

export const formatResponse = (response: Response) =>
	`${response.status}: ${response.statusText}`;

const toastOptions = {
	autoClose: 3000,
	hideProgressBar: true,
	closeButton: false,
	position: toast.POSITION.TOP_CENTER
};

//export const displayErrorNotification = (message: string) =>
//	toast.error(message, toastOptions);

export const displayErrorNotification = (
	message: string,
	errorResponse: FetchErrorResponse
) =>
	toast.error(
		`${message} (${errorResponse.statusCode}: ${errorResponse.statusText})`,
		toastOptions
	);

export const displaySuccessNotification = (message: string) =>
	toast.success(message, toastOptions);
