export function getEventListFormattedDate(date) {
	return new Date(date).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'short'
	});
}

export function isSameDay(date1, date2) {
	if (!(date1 instanceof Date)) {
		date1 = new Date(date1);
	}
	if (!(date2 instanceof Date)) {
		date2 = new Date(date2);
	}
	return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}

export function getTimeAMPMFromDate(date) {
	return new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: true }).format(new Date(date));
}
