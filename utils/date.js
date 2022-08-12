import moment from 'moment'

export function getFormattedDate(date) {
	return moment(date).format('ll');
}

export function getDateMinusDaysFromNow(dayCount) {
	return moment().subtract(dayCount + 1, 'days');
}