/* Convert unix timestamp to Date and Time
	ie. 1557996882 => 5/16/19, 4:54 AM
*/
export function getFormattedDateFromTimestamp (unixtime) {
	var dateTime = new Date(unixtime * 1000);
	var options = { year: '2-digit', month: 'numeric', day: 'numeric', hour: '2-digit', minute:'2-digit' };
	return dateTime.toLocaleString('en-EN', options);
}