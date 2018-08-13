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
	// A full numeric representation of a year, 4 digits | Examples: 1999 or 2003
	Y : date => { return date.getFullYear().toString();	},

	// Numeric representation of a month, without leading zeros | 1 through 12
	n : date => { return (date.getMonth() + 1).toString(); },

	// Numeric representation of a month, with leading zeros | 01 through 12
	m : date => { return parser.n(date) < 10 ? '0' + parser.n(date) : parser.n(date); },

	// Day of the month without leading zeros | 1 to 31
	j : date => { return date.getDate().toString(); },

	// Day of the month, 2 digits with leading zeros | 01 to 31
	d : date => { return parser.j(date) < 10 ? '0' + parser.j(date) : parser.j(date); },

	// 24-hour format of an hour without leading zeros | 0 through 23
	G : date => { return date.getHours().toString(); },

	// 24-hour format of an hour with leading zeros | 00 through 23
	H : date => { return parser.G(date) < 10 ? '0' + parser.G(date) : parser.G(date); },

	// Minutes with leading zeros | 00 to 59
	i : date => { return parser.I(date).toString() < 10 ? '0' + parser.I(date).toString() : parser.I(date).toString(); },

	// Minutes without leading zeros | 0 to 59
	I : date => { return date.getMinutes() },

	// Seconds, with leading zeros | 00 through 59
	s : date => { return parser.S(date) < 10 ? '0' + parser.S(date).toString() : parser.S(date).toString(); },

	// Seconds without leading zeros | 0 through 59
	S : date => { return date.getSeconds(); },

	// Numeric representation of the day of the week | 1 (for Monday) through 7 (for Sunday)
	N : date => { return date.getDay().toString(); },

	// Three letter representation of the day of the week | Mon through Sun
	k : date => { return parser.l(date).substr(0, 3); },

	// Three letter representation of the day of the week (lowercase) | mon through sun
	K : date => { return parser.L(date).substr(0, 3); },

	// A full textual representation of the day of the week | Monday through Sunday
	l : date => { return parser.L(date).charAt(0).toUpperCase() + parser.L(date).substr(1); },

	// A full textual representation of the day of the week (lowercase) | monday through sunday
	L : date => { return days[parser.N(date)]; },

	// Three letter representation of a month | Jan through Dec
	e : date => { return parser.f(date).substr(0, 3); },

	// Three letter representation of a month (lowercase) | jan through dec
	E : date => { return parser.F(date).substr(0, 3); },

	// A full textual representation of a month, such as January or March | January through December
	f : date => { return months[date.getDay()]; },

	// A full textual representation of a month, such as January or March (lowercase) | January through December
	F : date => { return parser.f(date).charAt(0).toUpperCase() + parser.f(date).substr(1); },

	// Lowercase Ante meridiem and Post meridiem | am or pm
	a : date => { return parser.G(date) < 12 ? meridiems[0] : meridiems[1]; },

	// Uppercase Ante meridiem and Post meridiem | AM or PM
	A : date => { return parser.G(date) < 12 ? meridiems[0].toUpperCase() : meridiems[1].toUpperCase(); },

	// Returning meridiem with first capital letter
	B : date => { return parser.G(date) < 12 ? meridiems[0].charAt(0).toUpperCase() + meridiems[0].substr(1) : meridiems[1].charAt(0).toUpperCase() + meridiems[1].substr(1) },

	// 12-hour format of an hour without leading zeros | 1 through 12
	g : date => { return date.getHours() < 12 ? date.getHours().toString() : (date.getHours() - 12).toString(); },

	// 12-hour format of an hour with leading zeros | 01 through 12
	h : date => { return parser.g(date) < 10 ? '0' + parser.g(date) : parser.g(date); },

	// 	Milliseconds | 5 or 74 or 654
	v : date => { return date.getMilliseconds(); },

	// Milliseconds with leading zeros | 005 or 074 or 654
	V : date => { return parser.v(date) < 10 ? '00' + parser.v(date) : (parser.v(date) < 100 ? '0' + parser.v(date) : parser.v(date)); },

	// Whether it's a leap year | 0 or 1
	x : date => { return (((parser.Y(date) % 4 == 0) && (parser.Y(date) % 100 != 0)) || (parser.Y(date) % 400 == 0)) ? '1' : '0'; },

}