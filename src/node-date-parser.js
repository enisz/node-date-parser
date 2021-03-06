'use strict';

module.exports = {
	parse : parse,
	config : {
		months : configMonths,
		days : configDays,
		meridiems : configMeridiems
	}
}

// A full textual representation of a month
let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

// A full textual representation of a day
let days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

// Ante meridiem and Post meridiem
let meridiems = ['am', 'pm'];

/**
 * Returns a string formatted according to the given format string using the given Date object or the current time if no timestamp is given. Date object is optional and defaults to the current date.
 * @param { string } format The format of the outputted date string.
 * @param { Date } date The optional Date object that defaults to the current date
 */
function parse(format, date = new Date())
{
	let output = '';

	for(let x in format)
		output += parser[format[x]] ? parser[format[x]](date) : format[x];

	return output;
}

/**
 * Setting custom months for the module to use.
 * @param { Array } customMonths An array containing all months with exactly 12 elements.
 */
function configMonths(customMonths)
{
	if(customMonths.length != 12)
		throw `Custom month's array must contain exactly 12 elements!`;

	months = customMonths.map( value => { return value.toLowerCase(); });
}

/**
 * Setting custom days for the module to use.
 * @param { Array } customDays An array containing all days with exactly 7 elements.
 */
function configDays(customDays)
{
	if(customDays.length != 7)
		throw `Custom day's array must contain exactly 7 elements!`;

	days = customDays.map( value => { return value.toLowerCase(); });
}

/**
 * Setting custom meridiems for the module to use.
 * @param { Array } customMeridiems An array containing both meridiems. Must have 2 elements.
 */
function configMeridiems(customMeridiems)
{
	if(customMeridiems.length != 2)
		throw `Custom meridiem's array must contain exactly 2 elements!`

	meridiems = customMeridiems.map( value => { return value.toLowerCase(); });
}

// An object containing all parser helper methods.
const parser = {
	/**
	 * A full numeric representation of a year, 4 digits
	 * Example: 1999 or 2003
	 */
	Y : date => { return date.getFullYear().toString();	},

	/**
	 * Numeric representation of a month, without leading zero
	 * Example: 1 through 12
	 */
	n : date => { return (date.getMonth() + 1).toString(); },

	/**
	 * Numeric representation of a month, with leading zero
	 * Example: 01 through 12
	 */
	m : date => { const month = parser.n(date); return month.length == 1 ? '0' + month : month; },

	/**
	 * Day of the month without leading zero
	 * Example: 1 to 31
	 */
	j : date => { return date.getDate().toString(); },

	/**
	 * Day of the month, 2 digits with leading zero
	 * Example: 01 to 31
	 */
	d : date => { const day = parser.j(date); return day.length == 1 ? '0' + day : day; },

	/**
	 * 24-hour format of an hour without leading zero
	 * Example: 0 through 23
	 */
	G : date => { return date.getHours().toString(); },

	/**
	 * 24-hour format of an hour with leading zero
	 * Example: 00 through 23
	 */
	H : date => { const hour = parser.G(date); return hour.length == 1 ? '0' + hour : hour; },

	/**
	 * Minutes with leading zero
	 * Example: 00 to 59
	 */
	i : date => { const minute = parser.I(date); return minute.length == 1 ? '0' + minute : minute; },

	/**
	 * Minutes without leading zero
	 * Example: 0 to 59
	 */
	I : date => { return date.getMinutes().toString() },

	/**
	 * Seconds, with leading zero
	 * Example: 00 through 59
	 */
	s : date => { const second = parser.S(date); return second.length == 1 ? '0' + second : second; },

	/**
	 * Seconds without leading zero
	 * Example: 0 through 59
	 */
	S : date => { return date.getSeconds().toString(); },

	/**
	 * Numeric representation of the day of the week
	 * Example: 1 (for Monday) through 7 (for Sunday)
	 */
	N : date => { return date.getDay().toString(); },

	/**
	 * Three letter representation of the day of the week
	 * Example: Mon through Sun
	 */
	k : date => { return parser.l(date).substr(0, 3); },

	/**
	 * Three letter representation of the day of the week (lowercase)
	 * Example: mon through sun
	 */
	K : date => { return parser.L(date).substr(0, 3); },

	/**
	 * A full textual representation of the day of the week
	 * Example: Monday through Sunday
	 */
	l : date => { const day = parser.L(date); return day.charAt(0).toUpperCase() + day.substr(1); },

	/**
	 * A full textual representation of the day of the week (lowercase)
	 * Example: monday through sunday
	 */
	L : date => { return days[parser.N(date)]; },

	/**
	 * Three letter representation of a month
	 * Example: Jan through Dec
	 */
	e : date => { return parser.f(date).substr(0, 3); },

	/**
	 * Three letter representation of a month (lowercase)
	 * Example: jan through dec
	 */
	E : date => { return parser.F(date).substr(0, 3); },

	/**
	 * A full textual representation of a month, such as January or March
	 * Example: January through December
	 */
	f : date => { return months[date.getMonth()]; },

	/**
	 * A full textual representation of a month, such as January or March (lowercase)
	 * Example: January through December
	 */
	F : date => { const month = parser.f(date); return month.charAt(0).toUpperCase() + month.substr(1); },

	/**
	 * Lowercase Ante meridiem and Post meridiem
	 * Example: am or pm
	 */
	a : date => { return parser.G(date) < 12 ? meridiems[0] : meridiems[1]; },

	/**
	 * Uppercase Ante meridiem and Post meridiem
	 * Example: AM or PM
	 */
	A : date => { return parser.G(date) < 12 ? meridiems[0].toUpperCase() : meridiems[1].toUpperCase(); },

	/**
	 * Returning meridiem with first capital letter
	 * Example: Am or Pm
	 */
	B : date => { return parser.G(date) < 12 ? meridiems[0].charAt(0).toUpperCase() + meridiems[0].substr(1) : meridiems[1].charAt(0).toUpperCase() + meridiems[1].substr(1) },

	/**
	 * 12-hour format of an hour without leading zero
	 * Example: 1 through 12
	 */
	g : date => { return date.getHours() < 12 ? date.getHours().toString() : (date.getHours() - 12).toString(); },

	/**
	 * 12-hour format of an hour with leading zero
	 * Example: 01 through 12
	 */
	h : date => { return parser.g(date) < 10 ? '0' + parser.g(date) : parser.g(date); },

	/**
	 * Milliseconds
	 * Example: 5 or 74 or 654
	 */
	v : date => { return date.getMilliseconds(); },

	/**
	 * Milliseconds with leading zeros
	 * Example: 005 or 074 or 654
	 */
	V : date => { return parser.v(date) < 10 ? '00' + parser.v(date) : (parser.v(date) < 100 ? '0' + parser.v(date) : parser.v(date)); },

	/**
	 * Whether it's a leap year
	 * Example: 0 or 1
	 */
	x : date => { return (((parser.Y(date) % 4 == 0) && (parser.Y(date) % 100 != 0)) || (parser.Y(date) % 400 == 0)) ? '1' : '0'; },

	/**
	 * Lowercase ordinal indicator
	 * Example: st, nd, th
	 */
	o : date => {
		const day = parser.d(date);

		const ordinary = (number) => {
			if(number == 1)
				return 'st';
			else if(number == 2)
				return 'nd';
			else if(number == 3)
				return 'rd';
			else
				return 'th';
		}

		if(day < 10)
			return ordinary(day);

		else {
			const ending = parseInt(day.toString().substr(-2))

			if(ending == 11 || ending == 12 || ending == 13)
				return 'th';
			else
				return ordinary(parseInt(ending.toString().substr(-1)));
		}
	}
}