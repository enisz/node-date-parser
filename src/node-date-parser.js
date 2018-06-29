'use strict';

/**
 * Returns a string formatted according to the given format string using the given Date object or the current time if no timestamp is given. Date object is optional and defaults to the current date.
 * @param { string } format The format of the outputted date string.
 * @param { Date } date The optional Date object that defaults to the current date
 */
module.exports = ( format, date = new Date() ) => {
	let output = '';

	for(let x in format)
		output += dateParser[format[x]] ? dateParser[format[x]](date) : format[x];
		
	return output;
};

// A full textual representation of a month
const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

// A full textual representation of a day
const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

// Ante meridiem and Post meridiem
const meridiems = ['am', 'pm'];
	
const dateParser = {
	// A full numeric representation of a year, 4 digits | Examples: 1999 or 2003
	Y : date => { return date.getFullYear().toString();	},

	// Numeric representation of a month, without leading zeros | 1 through 12
	n : date => { return (date.getMonth() + 1).toString(); },

	// Numeric representation of a month, with leading zeros | 01 through 12
	m : date => { return dateParser.n(date) < 10 ? '0' + dateParser.n(date) : dateParser.n(date); },

	// Day of the month without leading zeros | 1 to 31
	j : date => { return date.getDate().toString(); },

	// Day of the month, 2 digits with leading zeros | 01 to 31
	d : date => { return dateParser.j(date) < 10 ? '0' + dateParser.j(date) : dateParser.j(date); },

	// 24-hour format of an hour without leading zeros | 0 through 23
	G : date => { return date.getHours().toString(); },

	// 24-hour format of an hour with leading zeros | 00 through 23
	H : date => { return dateParser.G(date) < 10 ? '0' + dateParser.G(date) : dateParser.G(date); },

	// Minutes with leading zeros | 00 to 59
	i : date => { return date.getMinutes().toString() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString(); },

	// Seconds, with leading zeros | 00 through 59
	s : date => { return date.getSeconds().toString() < 10 ? '0' + date.getSeconds().toString() : date.getSeconds().toString(); },

	// Numeric representation of the day of the week | 1 (for Monday) through 7 (for Sunday)
	N : date => { return date.getDay().toString(); },

	// A full textual representation of the day of the week | Sunday through Saturday
	l : date => { return dateParser.L(date).charAt(0).toUpperCase() + dateParser.L(date).substr(1); },

	// A full textual representation of the day of the week (lowercase) | Sunday through Saturday
	L : date => { return days[dateParser.N(date)]; },

	// A full textual representation of a month, such as January or March | January through December
	f : date => { return months[date.getDay()]; },

	// A full textual representation of a month, such as January or March (lowercase) | January through December
	F : date => { return dateParser.f(date).charAt(0).toUpperCase() + dateParser.f(date).substr(1); },

	// Lowercase Ante meridiem and Post meridiem | am or pm
	a : date => { return dateParser.G(date) < 12 ? meridiems[0] : meridiems[1]; },

	// Uppercase Ante meridiem and Post meridiem | AM or PM
	A : date => { return dateParser.G(date) < 12 ? meridiems[0].toUpperCase() : meridiems[1].toUpperCase(); },

	// 12-hour format of an hour without leading zeros | 1 through 12
	g : date => { return date.getHours() < 12 ? date.getHours().toString() : (date.getHours() - 12).toString(); },

	// 12-hour format of an hour with leading zeros | 01 through 12
	h : date => { return dateParser.g(date) < 10 ? '0' + dateParser.g(date) : dateParser.g(date); },

	// 	Milliseconds | 5 or 74 or 654
	v : date => { return date.getMilliseconds(); },

	// Milliseconds with leading zeros | 005 or 074 or 654
	V : date => { return dateParser.v(date) < 10 ? '00' + dateParser.v(date) : (dateParser.v(date) < 100 ? '0' + dateParser.v(date) : dateParser.v(date)); }
}