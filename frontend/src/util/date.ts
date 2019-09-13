// TODO finish, refactor etc.
export const prettyPrintDateDifference = (date1: Date, date2: Date): string => {
	const timeDiff = Math.abs(date1.getTime() - date2.getTime());

	const milisecInMinute = 1000 * 60;
	const milisecInHour = milisecInMinute * 60;
	const milisecInDay = milisecInHour * 24;
	const milisecInWeek = milisecInDay * 7;

	if (timeDiff < milisecInMinute) {
		return 'now';
	}

	if (timeDiff < milisecInHour) {
		return `${Math.floor(timeDiff / milisecInMinute)} minutes`;
	}

	if (timeDiff < milisecInDay) {
		return `${Math.floor(timeDiff / milisecInHour)} hours`;
	}

	//if (timeDiff < milisecInWeek) {
	return `${Math.floor(timeDiff / milisecInDay)} days`;
	//}
};
